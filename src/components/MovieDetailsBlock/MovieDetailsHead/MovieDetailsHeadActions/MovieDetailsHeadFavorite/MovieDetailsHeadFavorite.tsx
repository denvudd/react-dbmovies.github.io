import React from "react";
import { useFavoriteAction } from "@/hooks/useFavoriteAction";

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
  const { handleClick: onClickAddToFavorite, favoriteMessageContext } =
    useFavoriteAction(sessionId, "movie", id, favorite, title);

  return (
    <>
      <li className={styles.tooltip}>
        <button
          onClick={onClickAddToFavorite}
          className={classNames({
            [styles.favorited]: favorite,
          })}
        >
          <span>
            <HeartFilled />
          </span>
        </button>
      </li>
      {favoriteMessageContext}
    </>
  );
};

export default MovieDetailsHeadFavorite;
