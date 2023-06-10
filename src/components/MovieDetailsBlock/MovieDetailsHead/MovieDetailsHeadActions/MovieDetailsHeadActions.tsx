import React from "react";
import RatingBar from "@/components/UI/RatingBar/RatingBar";
import CaretRightFilled from "@ant-design/icons/lib/icons/CaretRightFilled";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
import PushpinFilled from "@ant-design/icons/lib/icons/PushpinFilled";
import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
import { Popover } from "antd";
import classNames from "classnames";

interface MovieDetailsHeadActionsProps {
  id: number;
  vote_average: number;
  title: string;
}

import styles from "./MovieDetailsHeadActions.module.scss";
import { useLazyGetMovieAccoutStatesQuery } from "@/redux/api/movies/slice";
import MovieDetailsHeadRate from "./MovieDetailsHeadRate/MovieDetailsHeadRate";
import MovieDetailsHeadWatchlist from "./MovieDetailsHeadWatchlist/MovieDetailsHeadWatchlist";
import MovieDetailsHeadFavorite from "./MovieDetailsHeadFavorite/MovieDetailsHeadFavorite";
import MovieDetailsHeadLists from "./MovieDetailsHeadLists/MovieDetailsHeadLists";

const MovieDetailsHeadActions: React.FC<MovieDetailsHeadActionsProps> = ({
  id,
  vote_average,
  title,
}) => {
  const [
    getAccountStates,
    { data: accountStates, isLoading: isAccountStatesLoading },
  ] = useLazyGetMovieAccoutStatesQuery();
  const [sessionId, setSessionId] = React.useState<string | null>(null);

  React.useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
  }, [id]);

  React.useEffect(() => {
    if (sessionId) {
      getAccountStates({ movie_id: id, session_id: sessionId });
    }
  }, [sessionId, id]);

  return (
    <>
      <ul className={styles.headerActions + " auto"}>
        <li className={styles.chart}>
          <RatingBar rating={vote_average} size={55} />
          <span>Рейтинг</span>
        </li>
        <Popover
          content={
            <span>
              {!sessionId &&
                "Увійдіть, щоби створювати та керувати власними списками"}
              {sessionId && `Додати до списку`}
            </span>
          }
          placement="bottom"
        >
          <MovieDetailsHeadLists id={id} title={title} sessionId={sessionId} />
        </Popover>
        <Popover
          content={
            <span>
              {!sessionId &&
                "Увійдіть, щоб додати цей фільм до списку вподобань"}
              {accountStates?.favorite && sessionId && `Додано в обране`}
              {accountStates?.favorite === false &&
                sessionId &&
                "Додати в обране"}
            </span>
          }
          placement="bottom"
        >
          <MovieDetailsHeadFavorite
            id={id}
            title={title}
            sessionId={sessionId}
            favorite={accountStates ? accountStates.favorite : false}
          />
        </Popover>
        <Popover
          content={
            <span>
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
          placement="bottom"
        >
          <MovieDetailsHeadWatchlist
            id={id}
            title={title}
            sessionId={sessionId}
            watchlist={accountStates ? accountStates.watchlist : false}
          />
        </Popover>
        <Popover
          content={
            <span>
              {!sessionId && "Увійдіть, щоб оцінити цей фільм"}
              {accountStates?.rated &&
                sessionId &&
                `Оцінено ${accountStates.rated.value}.0`}
              {accountStates?.rated === false && sessionId && "Оцінити!"}
            </span>
          }
          placement="bottom"
        >
          <MovieDetailsHeadRate
            id={id}
            title={title}
            sessionId={sessionId}
            rated={accountStates ? accountStates.rated : false}
          />
        </Popover>
        <li className={styles.video}>
          <a href="">
            <span>
              <CaretRightFilled />
            </span>{" "}
            Дивитись трейлер
          </a>
        </li>
      </ul>
    </>
  );
};

export default MovieDetailsHeadActions;
