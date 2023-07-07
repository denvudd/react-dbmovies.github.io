import React from "react";
import { useGetTVCertificateQuery } from "@/redux/api/tv/slice";

import TVDetailsHeadActions from "./TVDetailsHeadActions/TVDetailsHeadActions";
import { Image as ANTDImage } from "antd";
import Image from "next/image";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";
import { FastAverageColor } from "fast-average-color";
import { createRgbaString } from "@/utils/createRgbaString";
import { generateShimmer } from "@/utils/generateShimmer";
import type { FastAverageColorResult } from "fast-average-color";
import type { Genre } from "@/redux/api/types/common";

import styles from "./TVDetailsHead.module.scss";

interface MovieDetailsHeadProps {
  id: number;
  poster_path: string | null;
  first_air_date: string;
  backdrop_path: string | null;
  name: string;
  genres: Genre[];
  tagline: string | null;
  overview: string | null;
  vote_average: number;
  vote_count: number;
}

const TVDetailsHead: React.FC<MovieDetailsHeadProps> = ({
  id,
  poster_path,
  first_air_date,
  backdrop_path,
  name,
  genres,
  tagline,
  overview,
  vote_average,
  vote_count,
}) => {
  const [isGalleryVisible, setIsGalleryVisible] = React.useState(false);
  const [backdropColor, setBackdropColor] = React.useState<number[] | null>(
    null
  );
  const [isBackdropLight, setIsBackdropLight] = React.useState(false);
  const { data: certificate } = useGetTVCertificateQuery(id);

  const releaseYear = first_air_date.split("-")[0]; // by first "-"

  React.useEffect(() => {
    // get dominant color by poster
    const fac = new FastAverageColor();
    if (poster_path) {
      fac
        .getColorAsync(
          `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`,
          { algorithm: "simple", crossOrigin: "anonymous" }
        )
        .then((result: FastAverageColorResult) => {
          setIsBackdropLight(result.isLight);
          setBackdropColor(result.value);
        })
        .catch((error) => {
          console.error("Ошибка при получении среднего цвета:", error);
        });
    }
  }, [id]);

  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
      }}
    >
      <div
        className={!isBackdropLight ? "backdrop" : "backdrop backdrop-light"}
        style={
          backdropColor && backdrop_path
            ? {
                backgroundImage: `linear-gradient(to right, ${createRgbaString(
                  backdropColor,
                  "1"
                )} calc((50vw - 170px) - 340px), ${createRgbaString(
                  backdropColor,
                  "0.74"
                )}  50%, ${createRgbaString(backdropColor, "0.74")} 100%)`,
              }
            : {
                backgroundImage: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)`,
              }
        }
      >
        <div className={styles.singleColumn}>
          <div className="app-container">
            <section className={styles.detailsHeader}>
              <div className={styles.posterWrapper}>
                <div className={styles.poster}>
                  {poster_path && (
                    <>
                      <Image
                        className={styles.posterImg}
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        width={300}
                        height={450}
                        priority
                        alt={`${name}`}
                        onClick={() => setIsGalleryVisible(true)}
                        placeholder="blur"
                        blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                          300,
                          400
                        )}`}
                      />
                      <ANTDImage
                        width={200}
                        style={{ display: "none" }}
                        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                        preview={{
                          visible: isGalleryVisible,
                          src: `https://image.tmdb.org/t/p/w500/${poster_path}`,
                          onVisibleChange: (value) => {
                            setIsGalleryVisible(value);
                          },
                        }}
                      />
                    </>
                  )}
                  <div className={styles.previewText}>
                    <EyeOutlined />
                    <span>Попередній перегляд</span>
                  </div>
                </div>
              </div>
              <div className={styles.headerWrapper}>
                <div className={styles.headerInner}>
                  <div className={styles.headerTitle}>
                    <h2>
                      <a href="">{name} </a>
                      <span>({releaseYear ? releaseYear : "-"})</span>
                    </h2>
                    <div className={styles.headerFacts}>
                      {certificate && (
                        <span className="head-certification">
                          {certificate}
                        </span>
                      )}
                      <span className={styles.release}>{first_air_date}</span>
                      <span className={styles.genres}>
                        {genres &&
                          genres.map((genre, index, array) => {
                            if (index + 1 !== array.length) {
                              return (
                                <a key={genre.id} href="">
                                  {genre.name},{" "}
                                </a>
                              );
                            } else {
                              return (
                                <a key={genre.id} href="">
                                  {genre.name}
                                </a>
                              );
                            }
                          })}
                      </span>
                    </div>
                  </div>
                  <TVDetailsHeadActions
                    voteAverage={vote_average}
                    voteCount={vote_count}
                    name={name}
                    id={id}
                  />
                  <div className={styles.headerInfo}>
                    {tagline && <h3 className={styles.tagline}>"{tagline}"</h3>}
                    <h2 className="auto">Огляд</h2>
                    <div className={styles.overview}>
                      {overview ? (
                        <p>{overview}</p>
                      ) : (
                        <p>
                          (Немає опису українською. Допоможіть — додайте його)
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TVDetailsHead;
