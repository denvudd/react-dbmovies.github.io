import React from "react";

import SeasonCard from "../../../UI/cards/SeasonCard/SeasonCard";
import type { Season } from "@/redux/api/tv/types";

import styles from "./TVSeasonsBlock.module.scss";

interface TVSeasonsBlockProps {
  seasons: Season[];
  name: string;
  seriesId: number;
}

const TVSeasonsBlock: React.FC<TVSeasonsBlockProps> = ({
  seasons,
  name,
  seriesId,
}) => {
  return (
    <>
      <div className={styles.seasons}>
        <div className="app-container">
          <div className={styles.inner}>
            <section className={styles.panel}>
              <h3>
                Сезони серіалу "{name}" <span>{seasons.length}</span>
              </h3>
            </section>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        {seasons.map((season) => (
          <div className={styles.seasonWrapper}>
            <section className={styles.seasonPanel}>
              <div className={styles.season}>
                <SeasonCard season={season} tvName={name} seriesId={seriesId} />
              </div>
            </section>
          </div>
        ))}
      </div>
    </>
  );
};

export default TVSeasonsBlock;
