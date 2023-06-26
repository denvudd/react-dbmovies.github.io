import React from "react";

import { EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import type { MovieTranslation } from "@/redux/api/movies/types";
import { formatRuntime } from "@/utils/formatRuntime";

import styles from "./TranslationCard.module.scss";

interface TranslationCardProps {
  translation: MovieTranslation;
}

const TranslationCard: React.FC<TranslationCardProps> = ({ translation }) => {
  const { iso_3166_1, iso_639_1, name } = translation;
  const { homepage, overview, runtime, tagline, title } = translation.data;

  return (
    <div className={styles.card} id={iso_3166_1}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th colSpan={2} className={styles.head}>
              <div className={styles.title}>
                <h2>
                  <Image
                    src={`/assets/country-flags/${iso_3166_1.toLocaleLowerCase()}.png`}
                    width={24}
                    height={18}
                    alt={`${name} flag`}
                  />
                  {name}{" "}
                  <span>
                    ({iso_3166_1}-{iso_639_1})
                  </span>
                </h2>
                <span>
                  <a href={`https://www.themoviedb.org/`} target="_blank">
                    <EditOutlined />
                  </a>
                </span>
              </div>
            </th>
          </tr>
          <tr>
            <td className={styles.rowTitle}>Назва</td>
            <td>{title ? title : "-"}</td>
          </tr>
          <tr>
            <td className={styles.rowTitle}>Слогани</td>
            <td>{tagline ? tagline : "-"}</td>
          </tr>
          <tr>
            <td className={styles.rowTitle}>Огляд</td>
            <td>{overview ? overview : "-"}</td>
          </tr>
          <tr>
            <td className={styles.rowTitle}>Тривалість</td>
            <td>{runtime !== 0 ? formatRuntime(runtime) : "-"}</td>
          </tr>
          <tr>
            <td className={styles.rowTitle}>Домашня сторінка</td>
            <td>{homepage ? <a href={homepage}>{homepage}</a> : "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TranslationCard;
