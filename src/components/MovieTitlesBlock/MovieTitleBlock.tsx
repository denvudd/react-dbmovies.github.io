import React from "react";

import type {
  MovieAltTitlesApiResponse,
  MovieDetails,
} from "@/redux/api/movies/types";
import AltTitleCard from "../UI/AltTitleCard/AltTitleCard";

import styles from "./MovieTitleBlock.module.scss";

interface MovieTitleBlockProps {
  data: MovieDetails & {
    alternative_titles: MovieAltTitlesApiResponse;
  };
}

const MovieTitleBlock: React.FC<MovieTitleBlockProps> = ({ data }) => {
  const { titles: countries } = data.alternative_titles;

  const countryList = new Map<
    string,
    { count: number; titles: { name: string; type: string }[]; types: string[] }
  >();

  countries.forEach((country) => {
    const { iso_3166_1, title, type } = country;

    if (countryList.has(iso_3166_1)) {
      const countryData = countryList.get(iso_3166_1);

      if (countryData !== undefined) {
        countryData.count += 1;
        countryData.titles.push({ name: title, type });
        countryData.types.push(type);
      }
    } else {
      countryList.set(iso_3166_1, { count: 1, titles: [{ name: title, type }], types: [type] });
    }
  });

  const formattedCountryList = Array.from(
    countryList,
    ([iso_3166_1, countryData]) => ({
      iso_3166_1,
      count: countryData.count,
      titles: countryData.titles,
      types: countryData.types,
    })
  );

  return (
    <>
      <div className={styles.titles}>
        <div className="media-content">
          <div className={styles.titlesWrapper}>
            {formattedCountryList.map((title) => (
              <AltTitleCard title={title} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieTitleBlock;
