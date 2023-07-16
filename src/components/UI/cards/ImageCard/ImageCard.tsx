import React from "react";

import Image from "next/image";
import { InfoCircleFilled } from "@ant-design/icons";
import { getImgFormatFromStr } from "@/utils/getImgFormatFromStr";
import { Tooltip } from "antd";
import { generateShimmer } from "@/utils/generateShimmer";
import type { Image as ImageType } from "@/redux/api/types/common";

import styles from "./ImageCard.module.scss";
import classNames from "classnames";

interface ImageCardProps {
  image: ImageType;
  type: "backdrop" | "logo" | "poster";
  title: string;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, type, title }) => {
  const { height, width, file_path, vote_average, vote_count } = image;

  const getImage = (type: ImageCardProps["type"]) => {
    switch (type) {
      case "backdrop":
        return (
          <Image
            src={`https://image.tmdb.org/t/p/w500_and_h282_face${file_path}`}
            alt={`${title} backdrop`}
            width={230}
            height={130}
            className={styles.cardImage}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
              300,
              400
            )}`}
          />
        );
      case "logo":
        return (
          <Image
            src={`https://image.tmdb.org/t/p/w500${file_path}`}
            alt={`${title} logo`}
            width={150}
            height={80}
            className={styles.cardImage + " " + styles.cardImageLogo}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
              300,
              400
            )}`}
          />
        );
      case "poster":
        return (
          <Image
            src={`https://image.tmdb.org/t/p/w220_and_h330_face${file_path}`}
            alt={`${title} poster`}
            width={230}
            height={350}
            className={styles.cardImage}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
              300,
              400
            )}`}
          />
        );
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <a
          href={`https://image.tmdb.org/t/p/original${file_path}`}
          target="_blank"
          title="Показати оригінал"
        >
          <div
            className={classNames(styles.containerImage, {
              [styles.containerImagePoster]: type === "poster",
            })}
          >
            <div className={styles.wrapperImage}>
              <div className={styles.aspectRatioWrapper}>
                <div className={styles.aspectRatioContent}>
                  {getImage(type)}
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div className={styles.info}>
        <div className={styles.meta}>
          <h3>Інфо</h3>
          <div className={styles.content}>
            <span>Розмір</span>
            <p>
              {width}x{height}
            </p>
            <span className={styles.format}>
              Формат{" "}
              <span>
                <Tooltip title="Підтримуються PNG, JPG і SVG. Краще SVG, оскільки вони не залежать від роздільної здатності.">
                  <InfoCircleFilled />
                </Tooltip>
              </span>
            </span>
            <p>{getImgFormatFromStr(file_path)?.toUpperCase()}</p>
            <span>Рейтинг</span>
            <p>{vote_average.toFixed(2)}</p>
            <span>Кількість оцінок</span>
            <p>{vote_count}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
