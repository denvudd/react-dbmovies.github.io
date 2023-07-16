import React from "react";
import { useWatchlistAction } from "@/hooks/useWatchlistAction";
import { useAddMovieToList } from "@/hooks/useAddMovieAction";
import { useRateMovieAction } from "@/hooks/useRateMovieAction";
import WideElementCard from "@/components/UI/cards/WideElementCard/WideElementCard";
import { message } from "antd";

interface WatchlistMovieCardProps {
  id: number;
  priorityIndex?: number;
  sessionId: string;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  overview: string;
  type: "movies" | "tv";
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
  type,
}) => {
  const [messageApi, contextMessageHolder] = message.useMessage();
  const { onClickAddMovieToList, addMovieListModalHolder } = useAddMovieToList(
    sessionId,
    id,
    title,
    messageApi
  );
  const { handleClick: removeFromWatchlist, watchlistMessageContext } =
    useWatchlistAction(
      sessionId,
      type === "movies" ? "movie" : "tv",
      id,
      true,
      title
    );
  const { onClickRateMovie, isLoading: isRateResultsLoading } =
    useRateMovieAction(sessionId, id, title, messageApi);

  return (
    <div>
      <WideElementCard
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
        type={type}
      />
      {contextMessageHolder}
      {addMovieListModalHolder}
    </div>
  );
};

export default WatchlistMovieCard;
