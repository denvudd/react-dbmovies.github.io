import React from "react";
import Link from "next/link";
import Image from "next/image";
import RatingBar from "../RatingBar/RatingBar";
import { Button, Rate, Typography } from "antd";
import { StarFilled, UnorderedListOutlined } from "@ant-design/icons";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./RatedMovieCard.module.scss";

interface RatedMovieCardProps {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
  release_date: string;
  overview: string;
  rating: number;
}

const RatedMovieCard: React.FC<RatedMovieCardProps> = ({
  id,
  poster_path,
  vote_average,
  title,
  release_date,
  overview,
  rating
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <div className={styles.poster}>
          <Link href={`/movies/${id}`}>
            <Image
              width={150}
              height={225}
              alt={``}
              src={poster_path}
            />
          </Link>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsMain}>
          <div className={styles.detailsHead}>
            <RatingBar size={38} rating={vote_average} />
            <div className={styles.title}>
              <div>
                <Link href={`/movies/${id}`}>
                  <h2>{title}</h2>
                </Link>
              </div>
              <span className={styles.release}>
                {formatReleaseDate(release_date)}
              </span>
            </div>
          </div>
          <div className={styles.overview}>
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {overview}
            </Typography.Paragraph>
          </div>
        </div>
        <div className={styles.panel}>
          <ul className={styles.panelList}>
            <li className={styles.option}>
              Ваша оцінка:
              <Rate value={rating} count={10} disabled style={{marginTop: "-5px"}}/>
            </li>
            <li className={styles.option}>
              <Button shape="circle" icon={<UnorderedListOutlined />}></Button>
              Додати до списку
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RatedMovieCard;
