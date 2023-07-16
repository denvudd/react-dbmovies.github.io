import React from "react";

import { v4 as uuidv4 } from "uuid";
import AltTitleCard from "../../../UI/cards/AltTitleCard/AltTitleCard";
import type { TVAltTitle } from "@/redux/api/tv/types";

import styles from "./TVTitles.module.scss";

interface TVTitleBlockProps {
  countries: TVAltTitle[];
}

const TVTitleBlock: React.FC<TVTitleBlockProps> = ({ countries }) => {

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
      countryList.set(iso_3166_1, {
        count: 1,
        titles: [{ name: title, type }],
        types: [type],
      });
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
              <AltTitleCard key={uuidv4()} title={title} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TVTitleBlock;
