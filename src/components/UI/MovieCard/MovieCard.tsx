import React from "react";

import { Card, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import RatingBar from "../RatingBar/RatingBar";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./MovieCard.module.scss";
import { generateShimmer } from "@/utils/generateShimmer";
interface MovieCardProps {
  id: number;
  index: number;
  title: string;
  imgUrl: string;
  description: string;
  voteAverage: number;
  release: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  index,
  title,
  imgUrl,
  description,
  voteAverage,
  release,
}) => {
  const { Title, Paragraph } = Typography;

  return (
    <Card
      hoverable
      size="small"
      cover={
        <Link href={`${id}`}>
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
                    blurDataURL={`data:image/svg+xml;base64,${generateShimmer(300, 400)}`}
                    priority={index < 10} // first 10 images priority = true, the rest will not
                  />
                </div>
              </div>
            </div>
          </div>
        </Link>
      }
    >
      <p className={styles.release}>{formatReleaseDate(release)}</p>
      <Link href={`${id}`}>
        <Title className={styles.title} ellipsis={{ rows: 1 }} level={5}>
          {title}
        </Title>
      </Link>
      <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
      <div className={styles.cardRating}>
        <RatingBar rating={voteAverage} size={40} />
      </div>
    </Card>
  );
};

export default MovieCard;
