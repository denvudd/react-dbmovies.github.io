import React from "react";

import { EditOutlined } from "@ant-design/icons";
import Image from "next/image";
import { formatRuntime } from "@/utils/formatRuntime";
import type { MovieTranslation } from "@/redux/api/movies/types";
import type { TVTranslation } from "@/redux/api/tv/types";

import styles from "./TranslationCard.module.scss";
import { PersonTranslation } from "@/redux/api/people/types";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";

interface TranslationCardProps {
  translation: MovieTranslation | TVTranslation | PersonTranslation;
  type?: "movie" | "tv" | "person";
}

const TranslationCard: React.FC<TranslationCardProps> = ({
  translation,
  type = "movie",
}) => {
  let name;
  let data;
  let biography;
  let ISO3166_1;
  let ISO639_1;

  if (type === "movie") {
    const {
      iso_3166_1,
      iso_639_1,
      name: movieName,
      data: movieData,
    } = translation as MovieTranslation;
    ISO3166_1 = iso_3166_1;
    ISO639_1 = iso_639_1;
    name = movieName;
    data = movieData;
  } else if (type === "tv") {
    const {
      iso_3166_1,
      iso_639_1,
      name: tvName,
      data: tvData,
    } = translation as TVTranslation;
    ISO3166_1 = iso_3166_1;
    ISO639_1 = iso_639_1;
    name = tvName;
    data = tvData;
  } else if (type === "person") {
    const {
      iso_3166_1,
      iso_639_1,
      name: personName,
      data: personData,
    } = translation as PersonTranslation;
    ISO3166_1 = iso_3166_1;
    ISO639_1 = iso_639_1;
    biography = personData.biography;
    name = personName;
    data = personData;
  }

  const { homepage, tagline, overview } = translation.data as
    | MovieTranslation["data"]
    | TVTranslation["data"];

  return (
    <div className={styles.card} id={ISO3166_1}>
      <table className={styles.table}>
        <tbody>
          <tr>
            <th colSpan={2} className={styles.head}>
              <div className={styles.title}>
                <h2>
                  {ISO3166_1 && (
                    <Image
                      src={`/assets/country-flags/${ISO3166_1.toLocaleLowerCase()}.png`}
                      width={24}
                      height={18}
                      alt={`${name} flag`}
                    />
                  )}
                  {name}{" "}
                  <span>
                    ({ISO639_1}-{ISO3166_1})
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
            {type === "tv" && (translation as TVTranslation) && (
              <td>{(translation.data as TVTranslation["data"]).name}</td>
            )}
            {type === "movie" && (translation as MovieTranslation) && (
              <td>{(translation.data as MovieTranslation["data"]).title}</td>
            )}
          </tr>
          {type !== "person" && (
            <tr>
              <td className={styles.rowTitle}>Слогани</td>
              <td>{tagline && typeof tagline === "string" ? tagline : "-"}</td>
              {tagline && typeof tagline === "object" && (
                <td className={styles.noPad}>
                  <table className={styles.taglines}>
                    <tbody>
                      {tagline.map((tagline) => (
                        <tr>
                          <td>{tagline}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              )}
            </tr>
          )}
          {type === "person" && (
            <tr>
              <td className={styles.rowTitle}>Біографія</td>
              <td className={styles.markdown}>
                <ReactMarkdown>{biography ? biography : "-"}</ReactMarkdown>
              </td>
            </tr>
          )}
          {type === "movie" ||
            (type === "tv" && (
              <tr>
                <td className={styles.rowTitle}>Огляд</td>
                <td>{overview ? overview : "-"}</td>
              </tr>
            ))}
          {type === "movie" && (translation as MovieTranslation) && (
            <tr>
              <td className={styles.rowTitle}>Тривалість</td>
              <td>
                {formatRuntime(
                  (translation.data as MovieTranslation["data"]).runtime
                )}
              </td>
            </tr>
          )}

          {type !== "person" && (
            <tr>
              <td className={styles.rowTitle}>Домашня сторінка</td>
              <td>{homepage ? <a href={homepage}>{homepage}</a> : "-"}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TranslationCard;
