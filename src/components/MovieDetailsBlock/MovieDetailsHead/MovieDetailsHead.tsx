import React from "react";
import { useGetMovieReleaseDatesQuery } from "@/redux/api/movies/slice";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";

import { Image as ANTDImage } from "antd";
import Image from "next/image";
import type { Genre } from "@/redux/api/genres/types/MovieListGenreType";
import { formatTime } from "@/utils/formatTime";
import { FastAverageColor } from "fast-average-color";
import type { FastAverageColorResult } from "fast-average-color";

import styles from "./MovieDetailsHead.module.scss";
import { createRgbaString } from "@/utils/createRgbaString";
import MovieDetailsHeadActions from "./MovieDetailsHeadActions/MovieDetailsHeadActions";
interface MovieDetailsHeadProps {
  id: number;
  poster_path: string | null;
  release_date: string;
  backdrop_path: string | null;
  title: string;
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  overview: string | null;
  vote_average: number;
}

const MovieDetailsHead: React.FC<MovieDetailsHeadProps> = ({
  id,
  poster_path,
  release_date,
  backdrop_path,
  title,
  genres,
  runtime,
  tagline,
  overview,
  vote_average,
}) => {
  const [isGalleryVisible, setIsGalleryVisible] = React.useState(false);
  const [backdropColor, setBackdropColor] = React.useState<number[] | null>(
    null
  );
  const [isBackdropLight, setIsBackdropLight] = React.useState(false);
  const { data: certificate } = useGetMovieReleaseDatesQuery(id);

  const releaseYear = release_date?.split("-")[0]; // by first "-"

  React.useEffect(() => {
    // get dominant color by backdrop
    const fac = new FastAverageColor();
    if (backdrop_path) {
      fac
        .getColorAsync(
          `https://image.tmdb.org/t/p/w220_and_h330_face${backdrop_path}`,
          { algorithm: "dominant", crossOrigin: "anonymous" }
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
        className={styles.backdrop}
        style={
          backdropColor && backdrop_path && !isBackdropLight
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
                        alt={`${title}`}
                        onClick={() => setIsGalleryVisible(true)}
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
                      <a href="">{title} </a>
                      <span>({releaseYear ? releaseYear : "-"})</span>
                    </h2>
                    <div className={styles.headerFacts}>
                      {certificate && (
                        <span className={styles.certification}>
                          {certificate}
                        </span>
                      )}
                      <span className={styles.release}>{release_date}</span>
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
                      {runtime && (
                        <span className={styles.runtime}>
                          {formatTime(runtime)}
                        </span>
                      )}
                    </div>
                  </div>
                  <MovieDetailsHeadActions
                    vote_average={vote_average}
                    title={title}
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

export default MovieDetailsHead;
