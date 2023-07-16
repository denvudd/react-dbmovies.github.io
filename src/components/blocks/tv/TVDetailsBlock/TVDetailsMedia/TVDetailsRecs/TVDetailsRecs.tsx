import React from "react";
import { useGetTVRecsQuery } from "@/redux/api/tv/slice";
import ElementDetailsRecs from "@/components/common/ElementDetailsRecs/ElementDetailsRecs";

interface TVDetailsRecsProps {
  id: number;
}

const TVDetailsRecs: React.FC<TVDetailsRecsProps> = ({ id }) => {
  const { data: recs, isLoading: isRecsLoading } = useGetTVRecsQuery({
    id,
    params: "language=uk-UA",
  });

  return <ElementDetailsRecs recs={recs} isLoading={isRecsLoading} id={id} />;
};

export default TVDetailsRecs;
