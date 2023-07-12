import React from "react";

import { v4 as uuidv4 } from "uuid";
import TranslationCard from "../UI/TranslationCard/TranslationCard";
import type { PersonTranslation } from "@/redux/api/people/types";

import styles from "./PersonTranslationBlock.module.scss";

interface TVTranslationsBlockProps {
  translations: PersonTranslation[];
}

const PersonTranslationsBlock: React.FC<TVTranslationsBlockProps> = ({
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
                type="person"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonTranslationsBlock;
