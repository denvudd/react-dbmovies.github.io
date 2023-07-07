import React from "react";

import WideVideoCard from "../UI/WideVideoCard/WideVideoCard";
import type { Video } from "@/redux/api/types/common";

import styles from "./MovieVideosBlock.module.scss";

interface MovieVideosBlockProps {
  videos: Video[];
}

interface VideoByType {
  [key: string]: Video[];
}

const MovieVideosBlock: React.FC<MovieVideosBlockProps> = ({ videos }) => {
  const videoByType = videos.reduce((acc: VideoByType, member: Video) => {
    const { type } = member;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(member);
    return acc;
  }, {});

  return (
    <>
      <h2 className={styles.title}>
        Відеороліки <span>{videos.length}</span>
      </h2>
      {videoByType["Trailer"] && (
        <div className={styles.wrapper}>
          <h3>Трейлери <span>{videoByType["Trailer"].length}</span></h3>
          <div className={styles.list}>
            {videoByType["Trailer"].map((video) => (
              <WideVideoCard video={video} />
            ))}
          </div>
        </div>
      )}
      {videoByType["Behind the Scenes"] && (
        <div className={styles.wrapper}>
          <h3>За сценами <span>{videoByType["Behind the Scenes"].length}</span></h3>
          <div className={styles.list}>
            {videoByType["Behind the Scenes"].map((video) => (
              <WideVideoCard video={video} />
            ))}
          </div>
        </div>
      )}
      {videoByType["Featurette"] && (
        <div className={styles.wrapper}>
          <h3>Короткометражки <span>{videoByType["Featurette"].length}</span></h3>
          <div className={styles.list}>
            {videoByType["Featurette"].map((video) => (
              <WideVideoCard video={video} />
            ))}
          </div>
        </div>
      )}
      {videoByType["Clip"] && (
        <div className={styles.wrapper}>
          <h3>Кліпи <span>{videoByType["Clip"].length}</span></h3>
          <div className={styles.list}>
            {videoByType["Clip"].map((video) => (
              <WideVideoCard video={video} />
            ))}
          </div>
        </div>
      )}
      {videoByType["Teaser"] && (
        <div className={styles.wrapper}>
          <h3>Тизери <span>{videoByType["Teaser"].length}</span></h3>
          <div className={styles.list}>
            {videoByType["Teaser"].map((video) => (
              <WideVideoCard video={video} />
            ))}
          </div>
        </div>
      )}
      {videos.length === 0 && (
        <div className={styles.empty}>
          До цього запису не додано матеріалів.
        </div>
      )}
    </>
  );
};

export default MovieVideosBlock;
