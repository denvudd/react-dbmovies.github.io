import React from "react";
import { useFavoriteAction } from "@/hooks/useFavoriteAction";

import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
import classNames from "classnames";

import styles from "../TVDetailsHeadAction.module.scss";

interface MovieDetailsHeadFavoriteProps {
  id: number;
  sessionId: string | null;
  favorite: boolean;
  name: string;
}

const TVDetailsHeadFavorite: React.FC<MovieDetailsHeadFavoriteProps> = ({
  id,
  sessionId,
  favorite,
  name,
}) => {
  const { onClickAddToFavorite, favoriteMessageContext } =
    useFavoriteAction(sessionId, "tv", id, favorite, name);

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

export default TVDetailsHeadFavorite;
