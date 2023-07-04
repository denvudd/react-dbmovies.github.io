import React from "react";

import Link from "next/link";
import Image from "next/image";
import RatingBarSmall from "../RatingBarSmall/RatingBarSmall";
import classNames from "classnames";
import { Typography } from "antd";
import type { Season } from "@/redux/api/tv/types";

import styles from "./SeasonCard.module.scss";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

interface SeasonCardProps {
  seriesId: number;
  tvName: string;
  season: Season;
  outlined?: boolean;
}

const SeasonCard: React.FC<SeasonCardProps> = ({
  seriesId,
  tvName,
  season,
  outlined = false,
}) => {
  const {
    id,
    name,
    season_number,
    overview,
    vote_average,
    episode_count,
    poster_path,
    air_date,
  } = season;

  return (
    <div
      className={classNames(styles.card, {
        [styles.outlined]: outlined,
      })}
    >
      <div className={styles.container}>
        <Link
          href={`/tv/${seriesId}/seasons/${season_number}`}
          className={classNames(styles.poster, {
            [styles.posterBordered]: !outlined,
          })}
        >
          <Image
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w130_and_h195_bestv2/${poster_path}`
                : `https://placehold.co/130x195/png/?text=Not+Found`
            }
            width={130}
            height={195}
            alt={`${name} poster`}
          />
        </Link>
        <div className={styles.content}>
          <div className={styles.head}>
            <div className={styles.title}>
              <h2>
                <Link href={`/tv/${seriesId}/seasons/${season_number}`}>
                  {name}
                </Link>
              </h2>
              {vote_average !== 0 && <RatingBarSmall isRounded={false} rating={vote_average} />}
            </div>
            <h4 className={styles.info}>
              {air_date} | {episode_count} серій
            </h4>
          </div>
          {overview !== "" && (
            <Typography.Paragraph
              ellipsis={{ rows: 3 }}
              className={styles.overview}
            >
              {overview}
            </Typography.Paragraph>
          )}
          {overview === "" && (
            <p>
              {season_number} сезон серіалу "{tvName}", прем'єра якого відбулася{" "}
              {formatReleaseDate(air_date)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeasonCard;
