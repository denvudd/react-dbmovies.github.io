import React from "react";
import { Card, Typography } from "antd";
import { DateTime } from "luxon";
import Image from "next/image";
import Link from "next/link";
import styles from "./MovieCard.module.scss";
import RatingBar from "../UI/RatingBar/RatingBar";

interface MovieCardProps {
  id: number;
  title: string;
  imgUrl: string;
  description: string;
  voteAverage: number;
  release: string;
}

const MovieCard: React.FC<MovieCardProps> = ({
  id,
  title,
  imgUrl,
  description,
  voteAverage,
  release,
}) => {
  const { Title, Paragraph } = Typography;

  const formattedReleaseDate = DateTime.fromISO(release)
    .setLocale("uk-UA")
    .toFormat("dd LLLL yyyy");

  return (
    <Card
      hoverable
      cover={
        <Link href={`${id}`}>
          <div className={styles.containerImage}>
            <Image
              className={styles.cardImage}
              alt="alt"
              width={300}
              height={400}
              src={imgUrl}
            />
          </div>
        </Link>
      }
    >
      <p>{formattedReleaseDate}</p>
      <Link href={`${id}`}>
        <Title ellipsis={{ rows: 1 }} level={5}>
          {title}
        </Title>
      </Link>
      <Paragraph ellipsis={{ rows: 2 }}>{description}</Paragraph>
      <div className={styles.cardRating}>
        <RatingBar rating={voteAverage} size={40}/>
      </div>
    </Card>
  );
};

export default MovieCard;
