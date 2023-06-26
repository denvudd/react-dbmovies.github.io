import React from "react";

import Link from "next/link";
import Image from "next/image";

import styles from "./DetailsBanner.module.scss";

interface DetailsBannerProps {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  averageColor: {
    backgroundColor: string;
  };
}

const DetailsBanner: React.FC<DetailsBannerProps> = ({
  id,
  title,
  releaseDate,
  posterPath,
  averageColor,
}) => {
  const releaseYear = releaseDate?.split("-")[0]; // by first "-"

  return (
    <div className={styles.wrapper} style={averageColor}>
      <div className="app-container">
        <div className={styles.inner}>
          <Link href={`/movies/${id}`} className={styles.poster}>
            <Image
              width={58}
              height={87}
              src={posterPath}
              alt={`${title} poster`}
            />
          </Link>
          <div className={styles.text}>
            <h2 className={styles.title}>
              <Link href={`/movies/${id}`}>{title}</Link> <span>({releaseYear})</span>
            </h2>
            <Link className={styles.back} href={`/movies/${id}`}>
              ← Повернутися на головну
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBanner;
