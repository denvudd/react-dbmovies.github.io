import React from "react";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Image from "next/image";
import Link from "next/link";
import RatingBar from "../RatingBar/RatingBar";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./MovieCard.module.scss";

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
            <Image
              className={styles.cardImage}
              alt="alt"
              width={300}
              height={400}
              src={imgUrl}
              priority={index < 10} // first 10 images priority = true, the rest will not
            />
          </div>
        </Link>
      }
    >
      <p>{formatReleaseDate(release)}</p>
      <Link href={`/raw/movies/${id}`}>
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
