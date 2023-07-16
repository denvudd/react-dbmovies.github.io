import React from "react";
import { useGetTVAggregateCreditsCastQuery } from "@/redux/api/tv/slice";

import ElementDetailsCast from "@/components/common/ElementDetailsCast/ElementDetailsCast";

interface TVDetailsCastProps {
  id: number;
}

const TVDetailsCast: React.FC<TVDetailsCastProps> = ({ id }) => {
  const { data: cast, isLoading } = useGetTVAggregateCreditsCastQuery({
    id,
    params: "language=uk-UA&page=1",
  });

  return (
    <ElementDetailsCast cast={cast?.cast} isLoading={isLoading} id={id} type="tv" />
  );
};

export default TVDetailsCast;
