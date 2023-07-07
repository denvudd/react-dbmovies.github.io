import React, { ReactNode } from "react";

import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import styles from "./DetailsBanner.module.scss";

interface DetailsBannerProps {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  averageColor: {
    backgroundColor: string;
  };
  isBackdropLight: boolean;

  type?: "movies" | "tv";
  customLink?: ReactNode | false;
  episodeNumber?: number;
  seasonNumber?: number;
  imageType?: "poster" | "backdrop";
}

const DetailsBanner: React.FC<DetailsBannerProps> = ({
  id,
  title,
  releaseDate,
  posterPath,
  averageColor,
  isBackdropLight,
  episodeNumber,
  seasonNumber,
  type = "movies",
  customLink = false,
  imageType = "poster",
}) => {
  const releaseYear = releaseDate?.split("-")[0]; // by first "-"

  return (
    <div className={styles.wrapper} style={averageColor}>
      <div className="app-container">
        <div className={classNames(styles.inner, {
          ["details-banner-light"]: isBackdropLight,
        })}>
          <Link href={`/${type}/${id}`} className={styles.poster}>
            {imageType === "poster" && (
              <Image
                width={58}
                height={87}
                src={posterPath}
                alt={`${title} poster`}
              />
            )}
            {imageType === "backdrop" && (
              <Image
              width={160}
              height={90}
              src={posterPath}
              alt={`${title} poster`}
            />
            )}
          </Link>
          <div className={styles.text}>
            <h2 className={styles.title}>
              {episodeNumber && episodeNumber && (
                <div className={styles.episodeCount}>
                  <span>
                    {seasonNumber}x{episodeNumber}
                  </span>
                </div>
              )}
              <Link href={`/${type}/${id}`}>{title}</Link>{" "}
              <span>({releaseYear ? releaseYear : "-"})</span>
            </h2>
            {customLink ? (
              customLink
            ) : (
              <Link className="details-back-navigation" href={`/${type}/${id}`}>
                ← Повернутися на головну
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsBanner;
