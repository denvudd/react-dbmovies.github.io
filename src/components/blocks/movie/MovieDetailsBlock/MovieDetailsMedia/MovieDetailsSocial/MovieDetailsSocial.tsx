import React from "react";
import { useGetMovieReviewsQuery } from "@/redux/api/movies/slice";
import ElementDetailsSocial from "@/components/common/ElementDetailsSocial/ElementDetailsSocial";

interface MovieDetailsSocialProps {
  id: number;
}

const MovieDetailsSocial: React.FC<MovieDetailsSocialProps> = ({ id }) => {
  const { data: reviews, isLoading: isReviewsLoading } =
    useGetMovieReviewsQuery({ id });

  return (
    <ElementDetailsSocial
      reviews={reviews?.results}
      isLoading={isReviewsLoading}
      type="movie"
      id={id}
    />
  );
};

export default MovieDetailsSocial;
