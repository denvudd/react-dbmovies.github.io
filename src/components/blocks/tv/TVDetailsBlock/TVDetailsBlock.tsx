import React from "react";

import TVDetailsHead from "./TVDetailsHead/TVDetailsHead";

import type { TVDetails } from "@/redux/api/tv/types";
import TVDetailsMedia from "./TVDetailsMedia/TVDetailsMedia";

type TVDetailsBlockProps = {
  id: number;
  data: TVDetails;
};

const TVDetailsBlock: React.FC<TVDetailsBlockProps> = ({ id, data }) => {
  const {
    poster_path,
    backdrop_path,
    first_air_date,
    name,
    genres,
    tagline,
    overview,
    vote_average,
    vote_count,
    original_language,
    original_name,
    status,
    type,
    networks,
    homepage,
    seasons,
  } = data;
  
  return (
    <>
      {data && (
        <>
          <TVDetailsHead
            id={id}
            poster_path={poster_path}
            backdrop_path={backdrop_path}
            first_air_date={first_air_date}
            name={name}
            genres={genres}
            tagline={tagline}
            overview={overview}
            vote_average={vote_average}
            vote_count={vote_count}
          />
          <TVDetailsMedia
            id={id}
            type={type}
            original_name={original_name}
            original_language={original_language}
            name={name}
            status={status}
            networks={networks}
            homepage={homepage}
            lastSeason={seasons[seasons.length - 1]}
          />
        </>
      )}
    </>
  );
};

export default TVDetailsBlock;
