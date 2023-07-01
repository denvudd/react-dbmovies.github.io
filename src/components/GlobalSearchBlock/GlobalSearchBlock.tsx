import React from "react";

import type {
  SearchMovie,
  SearchMultiApiResponse,
  SearchPerson,
  SearchTV,
} from "@/redux/api/search/types";
import styles from "./GlobalSearchBlock.module.scss";
import WideElementCard from "../UI/WideElementCard/WideElementCard";
import CreditCard from "../UI/CreditCard/CreditCard";

interface GlobalSearchBlockProps {
  results: SearchMultiApiResponse["results"] | undefined;
}

const GlobalSearchBlock: React.FC<GlobalSearchBlockProps> = ({ results }) => {
  const checkElementType = (element: SearchMovie | SearchTV | SearchPerson) => {
    switch (element.media_type) {
      case "movie":
        return (
          <WideElementCard
            title={element.title}
            id={element.id}
            vote_average={element.vote_average}
            release_date={element.release_date}
            overview={element.overview}
            rating={element.vote_average}
            poster_path={
              element.poster_path
                ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${element.poster_path}`
                : "https://placehold.co/150x225/png/?text=Not+Found"
            }
            type="movies"
          />
        );
      case "tv":
        return (
          <WideElementCard
            title={element.name}
            id={element.id}
            vote_average={element.vote_average}
            release_date={element.first_air_date}
            overview={element.overview}
            rating={element.vote_average}
            poster_path={
              element.poster_path
                ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${element.poster_path}`
                : "https://placehold.co/150x225/png/?text=Not+Found"
            }
            type="tv"
          />
        );
      case "person":
        return (
          <CreditCard
            id={element.id}
            poster={element.profile_path}
            name={element.name}
            job={element.known_for_department}
            character={
              element.known_for.length !== 0
                ? element.known_for[0].media_type === "movie"
                  ? element.known_for[0].title
                  : element.known_for[0].name
                : undefined
            }
          />
        );
    }
  };
  return (
    <div className={styles.container}>
      {results && results.map((result) => checkElementType(result))}
    </div>
  );
};

export default GlobalSearchBlock;
