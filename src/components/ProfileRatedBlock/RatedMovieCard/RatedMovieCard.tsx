import React from "react";
import { useDeleteMovieRatingMutation } from "@/redux/api/movies/slice";
import { useAddMovieToList } from "@/hooks/useAddMovieAction";

import { message } from "antd";
import WideMovieCard from "../../UI/WideMovieCard/WideMovieCard";
interface RatedMovieCardProps {
  id: number;
  priorityIndex?: number;
  sessionId: string;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  overview: string;
  rating: number;
}

const RatedMovieCard: React.FC<RatedMovieCardProps> = ({
  id,
  priorityIndex,
  sessionId,
  poster_path,
  vote_average,
  title,
  release_date,
  overview,
  rating,
}) => {
  const [messageApi, contextMessageHolder] = message.useMessage();
  const {
    onClickAddMovieToList,
    addMovieListModalHolder,
  } = useAddMovieToList(sessionId, id, title, messageApi);
  const [deleteMovieRating, { data: deleteMovieRatingResults }] =
    useDeleteMovieRatingMutation();

  const onClickElementDelete = () => {
    deleteMovieRating({ session_id: sessionId, movie_id: id })
      .unwrap()
      .then((data) => {
        if (data.success) {
          messageApi.success(`"${title}" був успішно видалений зі списку оцінених!`, 3);
        } else {
          messageApi.success(`${data.status_message}`, 3);
        }
      })
      .catch((error) => {
        if (error) {
          messageApi.error(
            `Сталась помилка! Елемента "${title}" не існує в списку оцінених!`,
            5
          );
        }
      });
  };

  return (
    <div>
      <WideMovieCard
        id={id}
        priorityIndex={priorityIndex && priorityIndex}
        title={title}
        overview={overview}
        vote_average={vote_average}
        release_date={release_date}
        rating={rating}
        poster_path={
          poster_path
            ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${poster_path}`
            : "https://placehold.co/150x225/png/?text=Not+Found"
        }
        isShowPanel
        isShowAddMovie
        isShowRate
        isShowDelete
        onClickElementDelete={onClickElementDelete}
        onClickAddMovieToList={onClickAddMovieToList}
      />
      {addMovieListModalHolder}
      {contextMessageHolder}
    </div>
  );
};

export default RatedMovieCard;
