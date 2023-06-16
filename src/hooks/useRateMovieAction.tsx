import React from "react";
import { usePostAddMovieRatingMutation } from "@/redux/api/movies/slice";

import type { MessageInstance } from "antd/es/message/interface";

export const useRateMovieAction = (sessionId: string, movieId: number, title: string, messageApi: MessageInstance) => {
  const [isRateSubmit, setIsRateSubmit] = React.useState(false);
  const [rate, setRate] = React.useState(1);
  const [
    rateMovie,
    { data: rateMovieResult, isLoading: isRateMovieResultLoading },
  ] = usePostAddMovieRatingMutation();

  const onClickRateMovie = (value: number) => {
    if (sessionId !== "") {
      if (value) {
        setRate(value);
        setIsRateSubmit(true);
      }
    }
  };

  React.useEffect(() => {
    if (isRateSubmit) {
      if (sessionId) {
        rateMovie({ session_id: sessionId, movie_id: movieId, rating: rate })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(`"${title}" був успішно оцінений!`, 3);
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
          .finally(() => setIsRateSubmit(false));
      }
    }
  }, [isRateSubmit]);

  return {
    onClickRateMovie,
    data: rateMovieResult,
    isLoading: isRateMovieResultLoading,
  };
};

