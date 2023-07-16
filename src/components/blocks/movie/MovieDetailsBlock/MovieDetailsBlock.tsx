import React from "react";

import MovieDetailsHead from "./MovieDetailsHead/MovieDetailsHead";
import MovieDetailsMedia from "./MovieDetailsMedia/MovieDetailsMedia";

import type { MovieDetails } from "@/redux/api/movies/types";

type MovieDetailsBlockProps = {
  id: number;
  data: MovieDetails;
};

const MovieDetailsBlock: React.FC<MovieDetailsBlockProps> = ({ id, data }) => {
  const {
    poster_path,
    backdrop_path,
    release_date,
    title,
    genres,
    runtime,
    tagline,
    overview,
    vote_average,
    vote_count,
    belongs_to_collection,
    original_language,
    original_title,
    status,
    budget,
    revenue,
  } = data;
  return (
    <>
      {data && (
        <>
          <MovieDetailsHead
            id={id}
            poster_path={poster_path}
            backdrop_path={backdrop_path}
            release_date={release_date}
            title={title}
            genres={genres}
            runtime={runtime}
            tagline={tagline}
            overview={overview}
            vote_average={vote_average}
            vote_count={vote_count}
          />
          <MovieDetailsMedia
            id={id}
            collectionData={
              belongs_to_collection ? belongs_to_collection : null
            }
            original_title={original_title}
            original_language={original_language}
            status={status}
            budget={budget}
            revenue={revenue}
          />
        </>
      )}
    </>
  );
};

export default MovieDetailsBlock;
