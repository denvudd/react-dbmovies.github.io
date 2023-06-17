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

  const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <defs>
      <linearGradient
      gradientTransform="rotate(133, 0.5, 0.5)"
      x1="50%"
      y1="0%"
      x2="50%"
      y2="100%"
      id="ffflux-gradient"
    >
      <stop
        stop-color="hsl(0, 0%, 0%)"
        stop-opacity="1"
        offset="0%"
      ></stop>
      <stop
        stop-color="hsl(0, 0%, 80%)"
        stop-opacity="1"
        offset="100%"
      ></stop>
    </linearGradient>
    <filter
      id="ffflux-filter"
      x="-20%"
      y="-20%"
      width="140%"
      height="140%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.005 0.003"
        numOctaves="2"
        seed="197"
        stitchTiles="stitch"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        result="turbulence"
      ></feTurbulence>
      <feGaussianBlur
        stdDeviation="20 0"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="turbulence"
        edgeMode="duplicate"
        result="blur"
      ></feGaussianBlur>
      <feBlend
        mode="color-burn"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="SourceGraphic"
        in2="blur"
        result="blend"
      ></feBlend>
    </filter>
  </defs>
  <rect width="${w}" height="${h}" fill="url(#ffflux-gradient)"
  filter="url(#ffflux-filter)"  />
</svg>
`;

  const toBase64 = (str: string) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);

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
