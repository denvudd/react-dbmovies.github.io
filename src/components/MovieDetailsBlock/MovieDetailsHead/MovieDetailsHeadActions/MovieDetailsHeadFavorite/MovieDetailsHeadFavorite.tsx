import React from "react";
import { usePostAddToFavoriteMutation } from "@/redux/api/account/slice";

import { message } from "antd";
import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
import classNames from "classnames";

import styles from "../MovieDetailsHeadActions.module.scss";
interface MovieDetailsHeadFavoriteProps {
  id: number;
  sessionId: string | null;
  favorite: boolean;
  title: string;
}

const MovieDetailsHeadFavorite: React.FC<MovieDetailsHeadFavoriteProps> = ({
  id,
  sessionId,
  favorite,
  title,
}) => {
  const [addToFavorite] = usePostAddToFavoriteMutation();
  const [isFavoriteSubmit, setIsFavoriteSubmit] = React.useState(false);

  const [messageApi, contextMessageHolder] = message.useMessage();

  const onClickAddMovieToFavorite = () => {
    if (sessionId) {
      setIsFavoriteSubmit(true);
    }
    if (!sessionId) {
      return;
    }
  };

  React.useEffect(() => {
    if (isFavoriteSubmit) {
      if (sessionId) {
        if (favorite) {
          // delete from favorite
          addToFavorite({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            favorite: false,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно видалений зі списку уподобань!`,
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
            .finally(() => setIsFavoriteSubmit(false));
        } else {
          // add to favorite
          addToFavorite({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            favorite: true,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно доданий до списку уподобань!`,
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
            .finally(() => setIsFavoriteSubmit(false));
        }
      }
    }
  }, [isFavoriteSubmit]);

  return (
    <>
      <li className={styles.tooltip}>
        <button
          onClick={onClickAddMovieToFavorite}
          className={classNames({
            [styles.favorited]: favorite,
          })}
        >
          <span>
            <HeartFilled />
          </span>
        </button>
      </li>
      {contextMessageHolder}
    </>
  );
};

export default MovieDetailsHeadFavorite;
