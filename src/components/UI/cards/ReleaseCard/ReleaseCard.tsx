import React from "react";

import { whereAlpha2 } from "iso-3166-1";
import Image from "next/image";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./ReleaseCard.module.scss";

interface ReleaseCard {
  release: {
    iso_3166_1: string;
    releases: {
      release_date: string;
      type: number;
      certification: string;
      note: string;
    }[];
  };
}

const ReleaseCard: React.FC<ReleaseCard> = ({ release }) => {
  const { iso_3166_1, releases } = release;
  const formattedCountryName = whereAlpha2(iso_3166_1)?.country;

  const formatType = (type: number) => {
    console.log(type);
    
    switch (type) {
      case (type = 1):
        return "Прем'єра";
      case (type = 2):
        return "Кінопрокат (обмежений)";
      case (type = 3):
        return "Кінопрокат";
      case (type = 4):
        return "Цифровий";
      case (type = 5):
        return "На носіях";
      case (type = 6):
        return "ТВ"
    }
  };

  return (
    <table className={styles.card}>
      <thead>
        <tr>
          <th colSpan={5}>
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
          <th className={styles.date}>Дата</th>
          <th className={styles.certification}>Сертифікація</th>
          <th className={styles.type}>Тип</th>
          <th className={styles.lang}>Мова</th>
          <th className={styles.note}>Примітка</th>
        </tr>
      </thead>
      <tbody>
        {releases.map((date) => (
          <tr key={date.release_date}>
            <td>{formatReleaseDate(date.release_date, "ua", "DD/MM/YYYY")}</td>
            <td>{date.certification}</td>
            <td>{formatType(date.type)}</td>
            <td></td>
            <td>{date.note}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReleaseCard;
