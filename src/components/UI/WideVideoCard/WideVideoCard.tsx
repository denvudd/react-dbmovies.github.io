import React from "react";

import { YoutubeFilled, CheckCircleFilled } from "@ant-design/icons";
import VideoCard from "../VideoCard/VideoCard";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import type { Video } from "@/redux/api/movies/types";

import styles from './WideVideoCard.module.scss'

interface WideVideoCardProps {
  video: Video;
}

const WideVideoCard: React.FC<WideVideoCardProps> = ({ video }) => {
  const { key, name, type, size, published_at, official } = video;

  return (
    <div key={key} className={styles.card}>
      <div className={styles.preview}>
        <VideoCard videoKey={key} />
      </div>
      <div className={styles.info}>
        <div className={styles.head}>
          <h2>
            <a href={`https://www.youtube.com/watch?v=${key}`} target="_blank">
              {name}
            </a>
          </h2>
          <h3>
            {type} • {size}p • {formatReleaseDate(published_at)}
          </h3>
        </div>
        <div className={styles.footer}>
          <span>
            <YoutubeFilled />
          </span>
          <h4>
            <a href={`https://www.youtube.com/watch?v=${key}`}>YouTube</a>
            {official && (
              <span title="Верифіковано">
                <CheckCircleFilled />
              </span>
            )}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default WideVideoCard;
