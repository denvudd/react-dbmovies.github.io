import type {
  SearchMovie,
  SearchMultiApiResponse,
  SearchPerson,
  SearchTV,
} from "@/redux/api/search/types";
import React from "react";
import { v4 as uuidv4 } from "uuid";

import styles from "./ResultsSider.module.scss";

interface ResultsSiderProps {
  results: SearchMultiApiResponse["results"] | undefined;
  totalResults: number;
}

type MediaType =
  | SearchMovie["media_type"]
  | SearchTV["media_type"]
  | SearchPerson["media_type"];

const ResultsSider: React.FC<ResultsSiderProps> = ({
  results,
  totalResults,
}) => {
  const mediaTypeList = new Map<MediaType, { count: number }>();

  results?.forEach((result) => {
    const { media_type } = result;

    if (mediaTypeList.has(media_type)) {
      const count = mediaTypeList.get(media_type);

      if (count !== undefined) {
        count.count += 1;
      }
    } else {
      mediaTypeList.set(media_type, { count: 1 });
    }
  });

  const formattedMediaTypeList = Array.from(
    mediaTypeList,
    ([media_type, count]) => ({
      media_type,
      count,
    })
  );

  const checkElementTypeTitle = (element: MediaType) => {
    switch (element) {
      case "tv":
        return "Серіали";
      case "movie":
        return "Фільми";
      case "person":
        return "Персони";
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <h3 className={styles.head}>
            Результати пошуку {results && <span>{results.length}</span>}
          </h3>
          <div className={styles.content}>
            {!results ||
              (results && results.length === 0 && (
                <div className={styles.notFound}>Результатів не знайдено</div>
              ))}
            <ul className={styles.results}>
              {formattedMediaTypeList.map((result) => (
                <li key={uuidv4()} className={styles.result}>
                  <a href={`#${result.media_type}`}>
                    {checkElementTypeTitle(result.media_type)}
                  </a>
                  <span>{result.count.count}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResultsSider;
