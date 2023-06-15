import React from "react";
import { usePostAddToFavoriteMutation } from "@/redux/api/account/slice";
import { message } from "antd";

export const useFavoriteAction = (
  sessionId: string | null,
  mediaType: "movie" | "tv",
  id: number,
  favorite: boolean,
  title: string
) => {
  const [addToFavorite] = usePostAddToFavoriteMutation();
  const [isFavoriteSubmit, setIsFavoriteSubmit] = React.useState(false);

  const [messageApi, contextMessageHolder] = message.useMessage();

  const handleAddToFavorite = async (
    sessionId: string,
    id: number,
    favorite: boolean
  ) => {
    try {
      try {
        const data = await addToFavorite({
          session_id: sessionId,
          media_type: mediaType,
          media_id: id,
          favorite,
        }).unwrap();
        if (data.success) {
          messageApi.success(
            `"${title}" ${
              favorite ? "був успішно доданий" : "був успішно видалений"
            } зі списку уподобань!`,
            3
          );
        } else {
          messageApi.success(`${data.status_message}`, 3);
        }
      } catch (error) {
        messageApi.error(`Сталась помилка! Текст помилки: ${error}`, 5);
      }
    } finally {
      setIsFavoriteSubmit(false);
    }
  };

  const onClickAddToFavorite = () => {
    if (sessionId) {
      setIsFavoriteSubmit(true);
    }
    if (!sessionId) {
      return;
    }
  };

  React.useEffect(() => {
    if (isFavoriteSubmit && sessionId) {
      if (favorite) {
        // if item in favorite then delete
        handleAddToFavorite(sessionId, id, false);
      } else {
        // if item in favorite then add
        handleAddToFavorite(sessionId, id, true);
      }
    }
  }, [isFavoriteSubmit]);

  return {
    handleClick: onClickAddToFavorite,
    favoriteMessageContext: contextMessageHolder,
  };
};
