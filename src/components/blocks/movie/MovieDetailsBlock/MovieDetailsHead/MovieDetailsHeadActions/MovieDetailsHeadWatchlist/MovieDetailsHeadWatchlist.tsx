import React from "react";
import { useWatchlistAction } from "@/hooks/useWatchlistAction";

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
  const { handleClick: onClickAddToWatchlist, watchlistMessageContext } =
    useWatchlistAction(sessionId, "movie", id, watchlist, title);

  return (
    <>
      <li className={styles.tooltip}>
        <button
          onClick={onClickAddToWatchlist}
          className={classNames({
            [styles.watchlist]: watchlist,
          })}
        >
          <span>
            <PushpinFilled />
          </span>
        </button>
      </li>
      {watchlistMessageContext}
    </>
  );
};

export default MovieDetailsHeadWatchlist;
