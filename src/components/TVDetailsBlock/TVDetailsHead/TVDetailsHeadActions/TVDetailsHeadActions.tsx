import React from "react";
import { useSessionId } from "@/hooks/useSessionId";
import { useLazyGetTVAccoutStatesQuery } from "@/redux/api/tv/slice";

import TVDetailsHeadRate from "./TVDetailsHeadRate/TVDetailsHeadRate";
import TVDetailsHeadWatchlist from "./TVDetailsHeadWatchlist/TVDetailsHeadWatchlist";
import TVDetailsHeadFavorite from "./TVDetailsHeadFavorite/TVDetailsHeadFavorite";
import RatingBar from "@/components/UI/RatingBar/RatingBar";
import CaretRightFilled from "@ant-design/icons/lib/icons/CaretRightFilled";
import { Tooltip, message } from "antd";

import styles from "./TVDetailsHeadAction.module.scss";

interface TVDetailsHeadActionsProps {
  id: number;
  voteAverage: number;
  voteCount: number;
  name: string;
}

const TVDetailsHeadActions: React.FC<TVDetailsHeadActionsProps> = ({
  id,
  voteAverage,
  voteCount,
  name,
}) => {
  const [messageApi, contextMessageHolder] = message.useMessage();
  const [getAccountStates, { data: accountStates }] =
    useLazyGetTVAccoutStatesQuery();
  const sessionId = useSessionId();

  React.useEffect(() => {
    if (sessionId) {
      getAccountStates({ tv_id: id, session_id: sessionId });
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
            <TVDetailsHeadFavorite
              id={id}
              name={name}
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
            <TVDetailsHeadWatchlist
              id={id}
              name={name}
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
            <TVDetailsHeadRate
              id={id}
              name={name}
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
    </>
  );
};

export default TVDetailsHeadActions;
