import React from "react";

import styles from "./MovieReleasesBlock.module.scss";
import type { ReleaseDate } from "@/redux/api/movies/types";
import ReleaseCard from "../UI/ReleaseCard/ReleaseCard";
import { ReleaseInfo } from "@/redux/api/movies/types/MovieReleaseDates";
import { v4 as uuidv4 } from "uuid";

interface MovieReleasesBlockProps {
  countries: ReleaseDate[];
}

const MovieReleasesBlock: React.FC<MovieReleasesBlockProps> = ({
  countries,
}) => {
  const releaseDatesMap = new Map<string, ReleaseInfo[]>();

  countries.forEach((releaseDate) => {
    const { iso_3166_1, release_dates } = releaseDate;

    if (releaseDatesMap.has(iso_3166_1)) {
      const existingReleaseInfo = releaseDatesMap.get(iso_3166_1);

      if (existingReleaseInfo) {
        existingReleaseInfo.push(...release_dates);
      }
    } else {
      releaseDatesMap.set(iso_3166_1, [...release_dates]);
    }
  });

  const formattedCountryList = Array.from(
    releaseDatesMap,
    ([iso_3166_1, release_dates]) => ({
      iso_3166_1,
      releases: release_dates,
    })
  );

  console.log(formattedCountryList);
  

  return (
    <>
      <div className={styles.releases}>
        <div className="media-content">
          <div className={styles.releasesWrapper}>
            {formattedCountryList.map((release) => (
              <ReleaseCard key={uuidv4()} release={release} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieReleasesBlock;