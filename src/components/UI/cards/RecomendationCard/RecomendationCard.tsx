import React from "react";

import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import Link from "next/link";
import RatingBar from "../../RatingBar/RatingBar";
import Image from "next/image";
import { generateShimmer } from "@/utils/generateShimmer";

import styles from "./RecomendationCard.module.scss";
interface RecomendationCardProps {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  type?: "movies" | "tv";
}

const RecomendationCard: React.FC<RecomendationCardProps> = ({
  id,
  poster_path,
  release_date,
  title,
  vote_average,
  type = "movies",
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContent}>
        <Link href={`/${type}/${id}`}>
          <Image
            loading="lazy"
            priority={false}
            width={250}
            height={141}
            src={poster_path}
            alt=""
            className={styles.image}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
              138,
              175
            )}`}
          />
          <div className={styles.info}>
            <div className={styles.release}>
              <span>
                <UnorderedListOutlined />
              </span>
              {release_date
                ? `Дата виходу: ${release_date}`
                : "Даних не знайдено"}
            </div>
          </div>
        </Link>
        <div className={styles.rating}>
          <RatingBar rating={vote_average} size={30} />
        </div>
      </div>
      <div className={styles.meta}>
        <Link href={`/${type}/${id}`} className={styles.title}>
          {title}
        </Link>
      </div>
    </div>
  );
};

export default RecomendationCard;
