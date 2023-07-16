import React from "react";
import { useGetTVReviewsQuery } from "@/redux/api/tv/slice";
import ElementDetailsSocial from "@/components/common/ElementDetailsSocial/ElementDetailsSocial";

interface MovieDetailsSocialProps {
  id: number;
}

const TVDetailsSocial: React.FC<MovieDetailsSocialProps> = ({ id }) => {
  const { data: reviews, isLoading: isReviewsLoading } = useGetTVReviewsQuery({
    id,
  });

  return (
    <ElementDetailsSocial
      reviews={reviews?.results}
      isLoading={isReviewsLoading}
      type="tv"
      id={id}
    />
  );
};

export default TVDetailsSocial;
