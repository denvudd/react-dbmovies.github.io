import React from "react";

import Image from "next/image";
import { whereAlpha2 } from "iso-3166-1";

import styles from "./AltTitleCard.module.scss";

interface AltTitleCardProps {
  title: {
    iso_3166_1: string;
    titles: { name: string; type: string }[];
  };
}

const AltTitleCard: React.FC<AltTitleCardProps> = ({ title }) => {
  const { iso_3166_1, titles } = title;
  const formattedCountryName = whereAlpha2(iso_3166_1)?.country;

  return (
    <table className={styles.card}>
      <thead>
        <tr>
          <th colSpan={2}>
            <h2 id={iso_3166_1} className={styles.title}>
              <Image
                src={`/assets/country-flags/${iso_3166_1.toLocaleLowerCase()}.png`}
                width={24}
                height={18}
                alt={`${formattedCountryName} flag`}
              />
              {formattedCountryName}
            </h2>
          </th>
        </tr>
        <tr className={styles.colTitle}>
          <th>Назва</th>
          <th>Тип</th>
        </tr>
      </thead>
      <tbody>
        {titles.map((title) => (
          <tr key={title.name}>
            <td>{title.name}</td>
            <td>{title.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AltTitleCard;
