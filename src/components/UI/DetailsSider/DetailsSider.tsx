import React from "react";

import { whereAlpha2 } from "iso-3166-1";
import { v4 as uuidv4 } from "uuid";
import classNames from "classnames";
import type {
  MovieAltTitle,
  MovieTranslation,
  ReleaseDate,
} from "@/redux/api/movies/types";
import type { TVAltTitle, TVTranslation } from "@/redux/api/tv/types";
import type { PersonTranslation } from "@/redux/api/people/types";

import styles from "./DetailsSider.module.scss";
interface AltTitleSiderProps {
  title: string;
  totalCount: number;
  items:
    | MovieAltTitle[]
    | TVAltTitle[]
    | ReleaseDate[]
    | MovieTranslation[]
    | TVTranslation[]
    | PersonTranslation[];
  averageColor: {
    backgroundColor: string;
  };
  isBackdropLight: boolean;
}

const AltTitleSider: React.FC<AltTitleSiderProps> = ({
  title,
  totalCount,
  items,
  averageColor,
  isBackdropLight,
}) => {
  const countryList = new Map<string, { count: number }>();

  items.forEach((country) => {
    const { iso_3166_1 } = country;

    if (countryList.has(iso_3166_1)) {
      const count = countryList.get(iso_3166_1);

      if (count !== undefined) {
        count.count += 1;
      }
    } else {
      countryList.set(iso_3166_1, { count: 1 });
    }
  });

  const formattedCountryList = Array.from(
    countryList,
    ([iso_3166_1, count]) => ({
      iso_3166_1,
      count,
    })
  );
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h3
          className={classNames("details-sider-title", {
            ["details-sider-title--light"]: isBackdropLight,
          })}
          style={averageColor}
        >
          {title} <span>{totalCount}</span>
        </h3>
        <div className={styles.content}>
          <ul className={styles.countries}>
            {formattedCountryList.map((country) => (
              <li key={uuidv4()} className={styles.country}>
                <a href={`#${country.iso_3166_1}`}>
                  {whereAlpha2(country.iso_3166_1)?.country}
                </a>
                <span>{country.count.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AltTitleSider;
