import React from "react";

import Link from "next/link";
import EpisodeGroupCard from "../UI/EpisodeGroupCard/EpisodeGroupCard";
import type { TVEpisodeGroupDetailsApiResponse } from "@/redux/api/tv/types";

import styles from "./TVEpisodeGroupDetailsBlock.module.scss";

interface TVEpisodeGroupDetailsBlockProps {
  episodeGroup: TVEpisodeGroupDetailsApiResponse;
  seriesId: number;
}

const TVEpisodeGroupDetailsBlock: React.FC<TVEpisodeGroupDetailsBlockProps> = ({
  episodeGroup,
  seriesId,
}) => {
  const {
    groups,
    id,
    name,
    type,
    episode_count,
    group_count,
    description,
    network,
  } = episodeGroup;

  return (
    <div className={styles.container}>
      <div className={styles.wrapper + " " + styles.wrapperHover}>
        <div className={styles.panel}>
          <div className={styles.season}>
            <EpisodeGroupCard
              name={name}
              description={description}
              groupCount={group_count}
              episodeCount={episode_count}
              type={type}
              network={network}
              id={id}
              seriesId={seriesId}
            />
          </div>
        </div>
      </div>
      {groups &&
        groups.length !== 0 &&
        groups
          .sort((a, b) => a.order - b.order)
          .map((group) => (
            <div key={group.id} className={styles.wrapper}>
              <section className={styles.panel}>
                <div className={styles.season}>
                  <div className={styles.content}>
                    <h2 className={styles.name}>
                      <Link
                        href={`/tv/${seriesId}/episode_groups/${id}/group/${group.id}`}
                      >
                        {group.name}
                      </Link>
                    </h2>
                    <h4 className={styles.meta}>
                      {group.episodes && group.episodes.length !== 0
                        ? `${group.episodes.length} серій`
                        : "-"}
                    </h4>
                  </div>
                </div>
              </section>
            </div>
          ))}
    </div>
  );
};

export default TVEpisodeGroupDetailsBlock;
