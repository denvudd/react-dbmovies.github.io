import React from "react";
import { usePostAddToWatchlistMutation } from "@/redux/api/account/slice";
import { message } from "antd";

/**
 * A custom React hook for adding a element to the user watchlist. Returns an object with a handler function and message holder.
*/

export const useWatchlistAction = (
  sessionId: string | null,
  mediaType: "movie" | "tv",
  id: number,
  watchlist: boolean,
  title: string
) => {
  const [addToWatchlist] = usePostAddToWatchlistMutation();
  const [isWatchlistSubmit, setIsWatchlistSubmit] = React.useState(false);

  const [messageApi, contextMessageHolder] = message.useMessage();

  const handleAddToWatchlist = async (
    sessionId: string,
    id: number,
    watchlist: boolean
  ) => {
    try {
      try {
        const data = await addToWatchlist({
          session_id: sessionId,
          media_type: mediaType,
          media_id: id,
          watchlist,
        }).unwrap();
        if (data.success) {
          messageApi.success(
            `"${title}" ${
              watchlist ? "був успішно доданий" : "був успішно видалений"
            } зі списку "Переглянути пізніше"!`,
            3
          );
        } else {
          messageApi.success(`${data.status_message}`, 3);
        }
      } catch (error) {
        messageApi.error(`Сталась помилка! Текст помилки: ${error}`, 5);
      }
    } finally {
      setIsWatchlistSubmit(false);
    }
  };

  const onClickAddToWatchlist = () => {
    if (sessionId) {
      setIsWatchlistSubmit(true);
    }
    if (!sessionId) {
      return;
    }
  };

  React.useEffect(() => {
    if (isWatchlistSubmit && sessionId) {
      if (watchlist) {
        // if item in watchlist then delete
        handleAddToWatchlist(sessionId, id, false);
      } else {
        // if item not in watchlist then add
        handleAddToWatchlist(sessionId, id, true);
      }
    }
  }, [isWatchlistSubmit]);

  return {
    handleClick: onClickAddToWatchlist,
    watchlistMessageContext: contextMessageHolder,
  };
};
