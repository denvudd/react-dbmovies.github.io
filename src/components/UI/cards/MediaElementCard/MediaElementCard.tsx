import React from "react";

import { Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import RatingBar from "../../RatingBar/RatingBar";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import { generateShimmer } from "@/utils/generateShimmer";
import classNames from "classnames";

import styles from "./MediaElementCard.module.scss";

interface MediaElementCardProps {
  id: number;
  title: string;
  imgUrl: string;
  description: string | null;
  voteAverage: number;
  release: string;
  index?: number;
  type?: "movie" | "tv";
  size?: "small" | "default";
}

const MediaElementCard: React.FC<MediaElementCardProps> = ({
  id,
  index,
  title,
  imgUrl,
  description,
  voteAverage,
  release,
  type = "movie",
  size = "default",
}) => {
  const { Title, Paragraph } = Typography;

  return (
    <Card
      hoverable
      size="small"
      cover={
        <Link href={`/${type === "movie" ? "movies" : "tv"}/${id}`}>
          <div className={styles.containerImage}>
            <div className={styles.wrapperImage}>
              <div className={styles.aspectRatioWrapper}>
                <div className={styles.aspectRatioContent}>
                  <Image
                    className={styles.cardImage}
                    alt={`${title} постер`}
                    width={300}
                    height={400}
                    src={imgUrl}
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                      300,
                      400
                    )}`}
                    priority={index ? index < 10 : false} // first 10 images priority = true, the rest will not
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      }
    >
      <p
        className={classNames(styles.release, {
          [styles.releaseSmall]: size === "small",
        })}
      >
        {formatReleaseDate(release)}
      </p>
      <Link href={`${id}`}>
        <Title
          className={classNames(styles.title, {
            [styles.titleSmall]: size === "small",
          })}
          ellipsis={{ rows: 1 }}
          level={5}
        >
          {title}
        </Title>
      </Link>
      {size === "default" && (
        <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
      )}
      <div className={styles.cardRating}>
        <RatingBar rating={voteAverage} size={size === "default" ? 40 : 32} />
      </div>
    </Card>
  );
};

export default MediaElementCard;
