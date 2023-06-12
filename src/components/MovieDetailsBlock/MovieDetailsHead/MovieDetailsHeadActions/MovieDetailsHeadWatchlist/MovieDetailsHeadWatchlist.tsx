import React from "react";
import { usePostAddToWatchlistMutation } from "@/redux/api/account/slice";

import { message } from "antd";
import PushpinFilled from "@ant-design/icons/lib/icons/PushpinFilled";
import classNames from "classnames";

import styles from "../MovieDetailsHeadActions.module.scss";
interface MovieDetailsHeadWatchlistProps {
  id: number;
  sessionId: string | null;
  watchlist: boolean;
  title: string;
}

const MovieDetailsHeadWatchlist: React.FC<MovieDetailsHeadWatchlistProps> = ({
  id,
  sessionId,
  watchlist,
  title,
}) => {
  const [addToWatchlist] = usePostAddToWatchlistMutation();
  const [isWatchlistSubmit, setIsWatchlistSubmit] = React.useState(false);

  const [messageApi, contextMessageHolder] = message.useMessage();

  const onClickAddMovieToWatchlist = () => {
    if (sessionId) {
      setIsWatchlistSubmit(true);
    }
    if (!sessionId) {
      return;
    }
  };

  React.useEffect(() => {
    if (isWatchlistSubmit) {
      if (sessionId) {
        if (watchlist) {
          // delete from watchlist
          addToWatchlist({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            watchlist: false,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно видалений зі списку "Переглянути пізніше"!`,
                  3
                );
              } else {
                messageApi.success(`${data.status_message}`, 3);
              }
            })
            .catch((error) => {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
                5
              );
            })
            .finally(() => setIsWatchlistSubmit(false));
        } else {
          // add to watchlist
          addToWatchlist({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            watchlist: true,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно доданий до списку "Переглянути пізніше"!`,
                  3
                );
              } else {
                messageApi.success(`${data.status_message}`, 3);
              }
            })
            .catch((error) => {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
                5
              );
            })
            .finally(() => setIsWatchlistSubmit(false));
        }
      }
    }
  }, [isWatchlistSubmit]);

  return (
    <>
      <li className={styles.tooltip}>
        <button
          onClick={onClickAddMovieToWatchlist}
          className={classNames({
            [styles.watchlist]: watchlist,
          })}
        >
          <span>
            <PushpinFilled />
          </span>
        </button>
      </li>
      {contextMessageHolder}
    </>
  );
};

export default MovieDetailsHeadWatchlist;
