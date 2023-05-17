import React from "react";
import MovieDetailsHead from "./MovieDetailsHead/MovieDetailsHead";
import MovieDetailsMedia from "./MovieDetailsMedia/MovieDetailsMedia";
import { useGetMovieDetailsQuery } from "@/redux/api/movies/slice";
import { Spin } from "antd";

type MovieDetailsBlockProps = {
  id: number;
};

const MovieDetailsBlock: React.FC<MovieDetailsBlockProps> = ({ id }) => {
  const { data: movie, isLoading } = useGetMovieDetailsQuery({
    id: id,
    params: "language=uk-UA&page=1",
  });

  return (
    <>
      {isLoading ? (
        <Spin></Spin>
      ) : (
        movie && (
          <>
            <MovieDetailsHead
              id={id}
              poster_path={movie.poster_path}
              backdrop_path={movie.backdrop_path}
              release_date={movie.release_date}
              title={movie.title}
              genres={movie.genres}
              runtime={movie.runtime}
              tagline={movie.tagline}
              overview={movie.overview}
              vote_average={movie.vote_average}
            />
            <MovieDetailsMedia
              id={id}
              collectionData={movie.belongs_to_collection ? movie.belongs_to_collection : null}
              original_title={movie.original_title}
              original_language={movie.original_language}
              status={movie.status}
              budget={movie.budget}
              revenue={movie.revenue}
            />
          </>
        )
      )}
    </>
  );
};

export default MovieDetailsBlock;
