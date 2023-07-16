import React from "react";

import { v4 as uuidv4 } from "uuid";
import TranslationCard from "../../../UI/cards/TranslationCard/TranslationCard";
import type { MovieTranslation } from "@/redux/api/movies/types";

import styles from "./MovieTranslationsBlock.module.scss";

interface MovieTranslationsBlockProps {
  translations: MovieTranslation[];
}

const MovieTranslationsBlock: React.FC<MovieTranslationsBlockProps> = ({
  translations,
}) => {

  return (
    <>
      <div className={styles.translations}>
        <div className="media-content">
          <div className={styles.translationsWrapper}>
            {translations.map((translation) => (
              <TranslationCard key={uuidv4()} translation={translation} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieTranslationsBlock;
