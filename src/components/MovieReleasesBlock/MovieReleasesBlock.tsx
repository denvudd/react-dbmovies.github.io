import React from "react";

import ReleaseCard from "../UI/ReleaseCard/ReleaseCard";
import { v4 as uuidv4 } from "uuid";
import type { ReleaseInfo } from "@/redux/api/types/common";
import type { ReleaseDate } from "@/redux/api/movies/types";

import styles from "./MovieReleasesBlock.module.scss";
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
