import React from "react";

import styles from "./AltTitleCard.module.scss";
import { whereAlpha2 } from "iso-3166-1";

interface AltTitleCardProps {
  title: {
    iso_3166_1: string;
    count: number;
    titles: { name: string; type: string }[]; 
  };
}

const AltTitleCard: React.FC<AltTitleCardProps> = ({ title }) => {
  return (
    <table className={styles.card}>
      <thead>
        <tr>
          <th colSpan={2}>
            <h2 id={title.iso_3166_1} className={styles.title}>
              {whereAlpha2(title.iso_3166_1)?.country}
            </h2>
          </th>
        </tr>
        <tr className={styles.colTitle}>
          <th>Назва</th>
          <th>Тип</th>
        </tr>
      </thead>
      <tbody>
        {title.titles.map((title) => (
          <tr>
            <td>{title.name}</td>
            <td>{title.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AltTitleCard;
