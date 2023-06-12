import React from "react";
import MovieDetailsHead from "./MovieDetailsHead/MovieDetailsHead";
import MovieDetailsMedia from "./MovieDetailsMedia/MovieDetailsMedia";
import type { MovieDetails } from "@/redux/api/movies/types";

type MovieDetailsBlockProps = {
  id: number;
  data: MovieDetails;
};

const MovieDetailsBlock: React.FC<MovieDetailsBlockProps> = ({ id, data }) => {

  return (
    <>
      {data && (
        <>
          <MovieDetailsHead
            id={data.id}
            poster_path={data.poster_path}
            backdrop_path={data.backdrop_path}
            release_date={data.release_date}
            title={data.title}
            genres={data.genres}
            runtime={data.runtime}
            tagline={data.tagline}
            overview={data.overview}
            vote_average={data.vote_average}
          />
          <MovieDetailsMedia
            id={id}
            collectionData={
              data.belongs_to_collection ? data.belongs_to_collection : null
            }
            original_title={data.original_title}
            original_language={data.original_language}
            status={data.status}
            budget={data.budget}
            revenue={data.revenue}
          />
        </>
      )}
    </>
  );
};

export default MovieDetailsBlock;
