import React from "react";

import { Select } from "antd";
import EpisodeCard from "../UI/EpisodeCard/EpisodeCard";
import type { Episode } from "@/redux/api/tv/types";

import styles from "./TVSeasonDetailsBlock.module.scss";

interface TVSeasonDetailsProps {
  episodes: Episode[];
  tvId: number;
}

const TVSeasonDetailsBlock: React.FC<TVSeasonDetailsProps> = ({
  episodes,
  tvId,
}) => {
  const [sortedEpisodes, setSortedEpisodes] =
    React.useState<Episode[]>(episodes);

  const onSort = (value: string) => {
    switch (value) {
      case "episode_desc":
        setSortedEpisodes(
          [...episodes].sort((a, b) => a.episode_number - b.episode_number)
        );
        break;
      case "episode_asc":
        setSortedEpisodes(
          [...episodes].sort((a, b) => b.episode_number - a.episode_number)
        );
        break;
      case "air.date_desc":
        setSortedEpisodes(
          [...episodes].sort(
            (a, b) =>
              new Date(a.air_date).getTime() - new Date(b.air_date).getTime()
          )
        );
        break;
      case "air.date_asc":
        setSortedEpisodes(
          [...episodes].sort(
            (a, b) =>
              new Date(b.air_date).getTime() - new Date(a.air_date).getTime()
          )
        );
        break;
      default:
        setSortedEpisodes(episodes);
        break;
    }
  };

  React.useEffect(() => {
    setSortedEpisodes(episodes);
    onSort("episodes_desc");
  }, [episodes]);

  return (
    <div className={styles.seasons}>
      <div className="app-container">
        <div className={styles.inner}>
          <section className={styles.panel}>
            <div className={styles.filter}>
              <h3>
                Серії <span>{episodes.length}</span>
              </h3>
              <div className={styles.sortableSort}>
                <div className={styles.sortGroup}>
                  <span className={styles.sortableSortTitle}>Сортування:</span>
                  <Select
                    defaultValue={"episode_desc"}
                    style={{ width: "100%" }}
                    options={[
                      { value: "episode_desc", label: "Епізоди за зростанням" },
                      { value: "episode_asc", label: "Епізоди за спаданням" },
                      {
                        value: "air.date_desc",
                        label: "Дата виходу за зростанням",
                      },
                      {
                        value: "air.date_asc",
                        label: "Дата виходу за спаданням",
                      },
                    ]}
                    onChange={onSort}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
        <section className={styles.episodes}>
          <div className={styles.container}>
            {sortedEpisodes &&
              sortedEpisodes.length !== 0 &&
              sortedEpisodes.map((episode, index) => (
                <div key={episode.id} className={styles.item}>
                  <EpisodeCard
                    name={episode.name}
                    airDate={episode.air_date}
                    overview={episode.overview}
                    episodeNumber={episode.episode_number}
                    runtime={episode.runtime}
                    seasonNumber={episode.season_number}
                    poster={
                      episode.still_path
                        ? `https://image.tmdb.org/t/p/w227_and_h127_bestv2${episode.still_path}`
                        : "https://placehold.co/227x127/png/?text=Not+Found"
                    }
                    showId={episode.show_id}
                    voteAverage={episode.vote_average}
                    voteCount={episode.vote_count}
                    index={index}
                    tvId={tvId}
                  />
                </div>
              ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default TVSeasonDetailsBlock;
