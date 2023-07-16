import React from "react";

import EpisodeGroupCard from "../../../UI/cards/EpisodeGroupCard/EpisodeGroupCard";
import type { EpisodeGroup } from "@/redux/api/tv/types";

import styles from "./TVEpisodeGroupsBlock.module.scss";

interface TVEpisodeGroupsBlockProps {
  episodeGroups: EpisodeGroup[];
  seriesId: number;
}

const TVEpisodeGroupsBlock: React.FC<TVEpisodeGroupsBlockProps> = ({
  episodeGroups,
  seriesId,
}) => {
  console.log(episodeGroups);

  return (
    <>
      <div className={styles.episodeGroups}>
        <div className="app-container">
          <div className={styles.inner}>
            <section className={styles.panel}>
              <h3>Групи серій</h3>
            </section>
          </div>
        </div>
      </div>
      {!episodeGroups ||
        (episodeGroups.length === 0 && (
          <div className="app-container">
            <p className="empty-text--default">
              До цього серіалу ще не додавали групи серій.
            </p>
          </div>
        ))}
      <div className={styles.container}>
        {episodeGroups.map((group) => (
          <div className={styles.episodeGroupsWrapper}>
            <section className={styles.episodeGroupsPanel}>
              <div className={styles.episodeGroup}>
                <EpisodeGroupCard
                  key={group.id}
                  seriesId={seriesId}
                  name={group.name}
                  description={group.description}
                  episodeCount={group.episode_count}
                  groupCount={group.group_count}
                  id={group.id}
                  network={group.network}
                  type={group.type}
                />
              </div>
            </section>
          </div>
        ))}
      </div>
    </>
  );
};

export default TVEpisodeGroupsBlock;
