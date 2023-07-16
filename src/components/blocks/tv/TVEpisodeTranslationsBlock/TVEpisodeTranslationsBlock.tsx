import React from "react";

import TranslationCard from "../../../UI/cards/TranslationCard/TranslationCard";
import { v4 as uuidv4 } from "uuid";
import type { TVTranslation } from "@/redux/api/tv/types";

import styles from './TVEpisodeTranslationsBlock.module.scss'

interface TVEpisodeTranslationsBlockProps {
  translations: TVTranslation[];
  tvName: string;
  episodeName: string;
}

const TVEpisodeTranslationsBlock: React.FC<TVEpisodeTranslationsBlockProps> = ({
  translations,
  tvName,
  episodeName,
}) => {
  return (
    <div className={styles.translations}>
      <div className="media-content">
        <div className={styles.translationsWrapper}>
          {translations.map((translation) => (
            <TranslationCard key={uuidv4()} translation={translation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVEpisodeTranslationsBlock;
