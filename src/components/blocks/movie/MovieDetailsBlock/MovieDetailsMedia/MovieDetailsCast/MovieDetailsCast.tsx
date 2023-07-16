import React from "react";
import { useGetMovieCreditsCastQuery } from "@/redux/api/movies/slice";
import ElementDetailsCast from "@/components/common/ElementDetailsCast/ElementDetailsCast";

interface MovieDetailsCastProps {
  id: number;
}

const MovieDetailsCast: React.FC<MovieDetailsCastProps> = ({ id }) => {
  const { data: cast, isLoading } = useGetMovieCreditsCastQuery({
    id,
    params: "language=uk-UA&page=1",
  });

  return (
    <ElementDetailsCast cast={cast?.cast} isLoading={isLoading} id={id} />
  );
};

export default MovieDetailsCast;
