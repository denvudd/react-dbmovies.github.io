import React from "react";

import Link from "next/link";
import Image from "next/image";
import RatingBarSmall from "../../RatingBarSmall/RatingBarSmall";
import { Tooltip, Typography } from "antd";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import { formatRuntime } from "@/utils/formatRuntime";
import { generateShimmer } from "@/utils/generateShimmer";

import styles from "./EpisodeCard.module.scss";

interface EpisodeCardProps {
  index: number;
  name: string;
  tvId: number;
  airDate: string;
  episodeNumber: number;
  overview: string | null;
  runtime: number;
  seasonNumber: number;
  showId: number;
  poster: string;
  voteAverage: number;
  voteCount: number;

  episodeCount?: boolean;
  isOutlined?: boolean;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({
  index,
  name,
  tvId,
  airDate,
  episodeNumber,
  overview,
  runtime,
  seasonNumber,
  poster,
  voteAverage,
  voteCount,
  episodeCount = false,
  isOutlined = true,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.poster}>
            <Link
              href={`/tv/${tvId}/seasons/${seasonNumber}/episode/${episodeNumber}`}
            >
              <Image
                src={poster}
                width={227}
                height={127}
                alt={`${name} poster episode`}
                priority={index ? index < 10 : false} // first 10 images priority = true, the rest will not
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                  300,
                  400
                )}`}
              />
            </Link>
          </div>
          <div className={styles.info}>
            <div className={styles.head}>
              <div className={styles.title}>
                <span>{index + 1}</span>
                <Tooltip title={`Кількість оцінок: ${voteCount}`}>
                  <div className={styles.rating}>
                    <RatingBarSmall rating={voteAverage} />
                  </div>
                </Tooltip>
                <h3>
                  <Link
                    href={`/tv/${tvId}/seasons/${seasonNumber}/episode/${episodeNumber}`}
                  >
                    {name}
                  </Link>
                  {episodeCount && (
                    <span className={styles.episodeNumber}>
                      {seasonNumber}x{episodeNumber}
                    </span>
                  )}
                </h3>
              </div>
            </div>
            <div className={styles.meta}>
              <span>{formatReleaseDate(airDate)} | {formatRuntime(runtime)}</span>
            </div>
            <div className={styles.overview}>
              <Typography.Paragraph ellipsis={{ rows: 2 }} style={{fontSize: "0.9em"}}>
                {overview && overview !== ""
                  ? overview
                  : "(Немає опису українською. Допоможіть — додайте його)"}
              </Typography.Paragraph>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EpisodeCard;
