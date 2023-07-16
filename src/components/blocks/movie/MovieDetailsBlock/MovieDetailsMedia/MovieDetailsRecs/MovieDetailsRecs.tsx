import React from "react";
import { useGetMovieRecsQuery } from "@/redux/api/movies/slice";
import ElementDetailsRecs from "@/components/common/ElementDetailsRecs/ElementDetailsRecs";

interface MovieDetailsRecsProps {
  id: number;
}

const MovieDetailsRecs: React.FC<MovieDetailsRecsProps> = ({ id }) => {
  const { data: recs, isLoading: isRecsLoading } = useGetMovieRecsQuery({
    id,
    params: "language=uk-UA",
  });

  return <ElementDetailsRecs recs={recs} isLoading={isRecsLoading} id={id} />;
};

export default MovieDetailsRecs;
