import React from "react";
import { useWatchlistAction } from "@/hooks/useWatchlistAction";
import { useAddMovieToList } from "@/hooks/useAddMovieAction";
import { useRateMovieAction } from "@/hooks/useRateMovieAction";

import { message } from "antd";
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
  const [messageApi, contextMessageHolder] = message.useMessage();
  const { onClickAddMovieToList, addMovieListModalHolder } = useAddMovieToList(
    sessionId,
    id,
    title,
    messageApi
  );
  const { handleClick: removeFromWatchlist, watchlistMessageContext } =
    useWatchlistAction(sessionId, "movie", id, true, title);
  const { onClickRateMovie, isLoading: isRateResultsLoading } =
    useRateMovieAction(sessionId, id, title, messageApi);

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
