import React from "react";
import { useWatchlistAction } from "@/hooks/useWatchlistAction";

import PushpinFilled from "@ant-design/icons/lib/icons/PushpinFilled";
import classNames from "classnames";

import styles from "../TVDetailsHeadAction.module.scss";

interface TVDetailsHeadWatchlistProps {
  id: number;
  sessionId: string | null;
  watchlist: boolean;
  name: string;
}

const TVDetailsHeadWatchlist: React.FC<TVDetailsHeadWatchlistProps> = ({
  id,
  sessionId,
  watchlist,
  name,
}) => {
  const { handleClick: onClickAddToWatchlist, watchlistMessageContext } =
    useWatchlistAction(sessionId, "tv", id, watchlist, name);

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

export default TVDetailsHeadWatchlist;
