import React from "react";
import { useLazyGetMovieAccoutStatesQuery } from "@/redux/api/movies/slice";
import { useSessionId } from "@/hooks/useSessionId";
import { useAddMovieToList } from "@/hooks/useAddMovieAction";

import MovieDetailsHeadRate from "./MovieDetailsHeadRate/MovieDetailsHeadRate";
import MovieDetailsHeadWatchlist from "./MovieDetailsHeadWatchlist/MovieDetailsHeadWatchlist";
import MovieDetailsHeadFavorite from "./MovieDetailsHeadFavorite/MovieDetailsHeadFavorite";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import RatingBar from "@/components/UI/RatingBar/RatingBar";
import CaretRightFilled from "@ant-design/icons/lib/icons/CaretRightFilled";
import { Tooltip, message } from "antd";

import styles from "./MovieDetailsHeadActions.module.scss";
interface MovieDetailsHeadActionsProps {
  id: number;
  voteAverage: number;
  voteCount: number;
  title: string;
}

const MovieDetailsHeadActions: React.FC<MovieDetailsHeadActionsProps> = ({
  id,
  voteAverage,
  voteCount,
  title,
}) => {
  const [messageApi, contextMessageHolder] = message.useMessage();
  const [getAccountStates, { data: accountStates }] =
    useLazyGetMovieAccoutStatesQuery();
  const sessionId = useSessionId();
  const { onClickAddMovieToList, addMovieListModalHolder } = useAddMovieToList(
    sessionId,
    id,
    title,
    messageApi
  );

  React.useEffect(() => {
    if (sessionId) {
      getAccountStates({ movie_id: id, session_id: sessionId });
    }
  }, [sessionId, id]);

  return (
    <>
      <ul className={styles.headerActions + " auto"}>
        <li className={styles.chart}>
          <Tooltip
            title={
              <span className={styles.tooltip}>
                {voteCount !== 0
                  ? `Кількість оцінок: ${voteCount}`
                  : "Ще не оціненно"}
              </span>
            }
            color={"#fff"}
            placement="bottom"
          >
            <div>
              <RatingBar rating={voteAverage} size={55} />
            </div>
          </Tooltip>
          <span>Оцінка користувачів</span>
        </li>
        <Tooltip
          title={
            <span className={styles.tooltip}>
              {!sessionId &&
                "Увійдіть, щоби створювати та керувати власними списками"}
              {sessionId && `Додати до списку`}
            </span>
          }
          color={"#fff"}
          placement="bottom"
          zIndex={90}
        >
          <span className={styles.tooltipWrapper}>
            <li className={styles.tooltip}>
              <button onClick={onClickAddMovieToList}>
                <span>
                  <UnorderedListOutlined />
                </span>
              </button>
            </li>
          </span>
        </Tooltip>
        <Tooltip
          title={
            <span className={styles.tooltip}>
              {!sessionId &&
                "Увійдіть, щоб додати цей фільм до списку вподобань"}
              {accountStates?.favorite && sessionId && `Додано в обране`}
              {accountStates?.favorite === false &&
                sessionId &&
                "Додати в обране"}
            </span>
          }
          color={"#fff"}
          placement="bottom"
        >
          <span className={styles.tooltipWrapper}>
            <MovieDetailsHeadFavorite
              id={id}
              title={title}
              sessionId={sessionId}
              favorite={accountStates ? accountStates.favorite : false}
            />
          </span>
        </Tooltip>
        <Tooltip
          title={
            <span className={styles.tooltip}>
              {!sessionId &&
                "Увійдіть, щоб додати цей фільм до списку перегляду"}
              {accountStates?.watchlist &&
                sessionId &&
                `Додано до списку відстежень`}
              {accountStates?.watchlist === false &&
                sessionId &&
                "Додати до списку відстежень"}
            </span>
          }
          color={"#fff"}
          placement="bottom"
        >
          <span className={styles.tooltipWrapper}>
            <MovieDetailsHeadWatchlist
              id={id}
              title={title}
              sessionId={sessionId}
              watchlist={accountStates ? accountStates.watchlist : false}
            />
          </span>
        </Tooltip>
        <Tooltip
          title={
            <span className={styles.tooltip}>
              {!sessionId && "Увійдіть, щоб оцінити цей фільм"}
              {accountStates?.rated &&
                sessionId &&
                `Оцінено ${accountStates.rated.value}.0`}
              {accountStates?.rated === false && sessionId && "Оцінити!"}
            </span>
          }
          color={"#fff"}
          placement="bottom"
        >
          <span className={styles.tooltipWrapper}>
            <MovieDetailsHeadRate
              id={id}
              title={title}
              sessionId={sessionId}
              rated={accountStates ? accountStates.rated : false}
            />
          </span>
        </Tooltip>
        <li className={styles.video}>
          <a href="">
            <span>
              <CaretRightFilled />
            </span>{" "}
            Дивитись трейлер
          </a>
        </li>
      </ul>
      {contextMessageHolder}
      {addMovieListModalHolder}
    </>
  );
};

export default MovieDetailsHeadActions;
