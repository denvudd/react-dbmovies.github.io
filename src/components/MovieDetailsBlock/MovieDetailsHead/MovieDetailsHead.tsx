import React from "react";
import styles from "./MovieDetailsHead.module.scss";
import { useGetMovieReleaseDatesQuery } from "@/redux/api/movies/slice";
import { formatTime } from "@/utils/formatTime";
import {
  CaretRightFilled,
  UnorderedListOutlined,
  HeartFilled,
  PushpinFilled,
  StarFilled,
} from "@ant-design/icons";
import RatingBar from "@/components/UI/RatingBar/RatingBar";
import { Image, Popover } from "antd";
import { Genre } from "@/redux/api/genres/types/MovieListGenreType";

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
  const { data: certificate } = useGetMovieReleaseDatesQuery(id);

  const releaseYear = release_date?.split("-")[0]; // by first "-"

  return (
    <div
      className={styles.header}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${backdrop_path})`,
      }}
    >
      <div className={styles.backdrop}>
        <div className={styles.singleColumn}>
          <div className="app-container">
            <section className={styles.detailsHeader}>
              <div className={styles.posterWrapper}>
                <div className={styles.poster}>
                  {poster_path && (
                    <Image
                      className={styles.posterImg}
                      src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
                      alt=""
                    />
                  )}
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
                  <ul className={styles.headerActions + " auto"}>
                    <li className={styles.chart}>
                      <RatingBar rating={vote_average} size={55} />
                      <span>Рейтинг</span>
                    </li>
                    <Popover
                      content={<span>Додати до списку</span>}
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <a href="">
                          <span>
                            <UnorderedListOutlined />
                          </span>
                        </a>
                      </li>
                    </Popover>
                    <Popover
                      content={<span>Додати в обране</span>}
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <a href="">
                          <span>
                            <HeartFilled />
                          </span>
                        </a>
                      </li>
                    </Popover>
                    <Popover
                      content={<span>Додати до списку відстеження</span>}
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <a href="">
                          <span>
                            <PushpinFilled />
                          </span>
                        </a>
                      </li>
                    </Popover>
                    <Popover content={<span>Оцінити!</span>} placement="bottom">
                      <li className={styles.tooltip}>
                        <a href="">
                          <span>
                            <StarFilled />
                          </span>
                        </a>
                      </li>
                    </Popover>
                    <li className={styles.video}>
                      <a href="">
                        <span>
                          <CaretRightFilled />
                        </span>{" "}
                        Дивитись трейлер
                      </a>
                    </li>
                  </ul>
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
