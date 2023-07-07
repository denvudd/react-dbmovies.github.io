import React from "react";

import EpisodeGroupCard from "../UI/EpisodeGroupCard/EpisodeGroupCard";
import EpisodeCard from "../UI/EpisodeCard/EpisodeCard";
import type {
  Episode,
  TVEpisodeGroupDetailsApiResponse,
} from "@/redux/api/tv/types";

import styles from "./TVEpisodeGroupEpisodesBlock.module.scss";

interface TVEpisodeGroupEpisodesBlockProps {
  seriesId: number;
  episodeGroup: TVEpisodeGroupDetailsApiResponse;
  groupId: string;
}

const TVEpisodeGroupEpisodesBlock: React.FC<
  TVEpisodeGroupEpisodesBlockProps
> = ({ episodeGroup, seriesId, groupId }) => {
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
  const episodes = groups.find((group) => group.id === groupId)?.episodes;
  const [sortedEpisodes, setSortedEpisodes] = React.useState<
    Episode[] | undefined
  >(episodes);

  const onSort = (value: string) => {
    if (episodes === undefined) {
      return; // Ничего не делать, если episodes === undefined
    }

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
    <>
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
      </div>
      <div className={styles.seasons}>
        <div className="app-container">
          <div className={styles.inner}>
            <section className={styles.panel}>
              <h3 className={styles.title}>
                Серії <span>{episodes && episodes.length}</span>
              </h3>
            </section>
          </div>
          <section className={styles.episodes}>
            <div className={styles.container}>
              {sortedEpisodes &&
                sortedEpisodes.length !== 0 &&
                sortedEpisodes.map((episode, index) => (
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
                    tvId={seriesId}
                    episodeCount
                  />
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default TVEpisodeGroupEpisodesBlock;
