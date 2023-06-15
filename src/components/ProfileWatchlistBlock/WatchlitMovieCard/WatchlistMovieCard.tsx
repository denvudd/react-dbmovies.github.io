import React from "react";
import { usePostAddMovieRatingMutation } from "@/redux/api/movies/slice";
import { useWatchlistAction } from "@/hooks/useWatchlistAction";
import { useAddMovieToList } from "@/hooks/useAddMovieAction";

import { message, Modal } from "antd";
import WideMovieCard from "@/components/UI/WideMovieCard/WideMovieCard";
interface WatchlistMovieCardProps {
  id: number;
  priorityIndex?: number;
  sessionId: string;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  overview: string;
}

const WatchlistMovieCard: React.FC<WatchlistMovieCardProps> = ({
  id,
  priorityIndex,
  sessionId,
  poster_path,
  vote_average,
  title,
  release_date,
  overview,
}) => {
  const [isRateSubmit, setIsRateSubmit] = React.useState(false);
  const [rate, setRate] = React.useState<number>(1);
  const [messageApi, contextMessageHolder] = message.useMessage();
  const {
    onClickAddMovieToList,
    addMovieListModalHolder,
  } = useAddMovieToList(sessionId, id, title, messageApi);
  const { handleClick: removeFromWatchlist, watchlistMessageContext } =
    useWatchlistAction(sessionId, "movie", id, true, title);
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
        rateMovie({ session_id: sessionId, movie_id: id, rating: rate })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(
                `"${title}" був успішно оцінений! Його буде видалено зі списку "Переглянути пізніше" та зараховано як переглянутий`,
                6
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
          .finally(() => setIsRateSubmit(false));
      }
    }
  }, [isRateSubmit]);

  return (
    <div>
      <WideMovieCard
        id={id}
        priorityIndex={priorityIndex && priorityIndex}
        title={title}
        overview={overview}
        vote_average={vote_average}
        release_date={release_date}
        poster_path={
          poster_path
            ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${poster_path}`
            : "https://placehold.co/150x225/png/?text=Not+Found"
        }
        isShowPanel
        isShowAddMovie
        isShowDelete
        isShowRate
        isRateReadonly={false}
        onClickElementDelete={() => removeFromWatchlist()}
        onClickAddMovieToList={onClickAddMovieToList}
        onChangeMovieRate={onClickRateMovie}
      />
      {contextMessageHolder}
      {addMovieListModalHolder}
    </div>
  );
};

export default WatchlistMovieCard;
