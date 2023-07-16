import React from "react";

import { v4 as uuidv4 } from "uuid";
import TranslationCard from "../../../UI/cards/TranslationCard/TranslationCard";
import type { TVTranslation } from "@/redux/api/tv/types";

import styles from "./TVTranslationsBlock.module.scss";

interface TVTranslationsBlockProps {
  translations: TVTranslation[];
}

const TVTranslationsBlock: React.FC<TVTranslationsBlockProps> = ({
  translations,
}) => {
  return (
    <>
      <div className={styles.translations}>
        <div className="media-content">
          <div className={styles.translationsWrapper}>
            {translations.map((translation) => (
              <TranslationCard
                key={uuidv4()}
                translation={translation}
                type="tv"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TVTranslationsBlock;
