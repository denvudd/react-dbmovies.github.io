import React from "react";
import {
  useGetMovieReleaseDatesQuery,
  useLazyGetMovieAccoutStatesQuery,
  usePostAddMovieRatingMutation,
} from "@/redux/api/movies/slice";
import { usePostAddMovieToListMutation } from "@/redux/api/lists/slice";
import {
  useLazyGetAccountListsQuery,
  usePostAddToFavoriteMutation,
  usePostAddToWatchlistMutation,
} from "@/redux/api/account/slice";

import CaretRightFilled from "@ant-design/icons/lib/icons/CaretRightFilled";
import UnorderedListOutlined from "@ant-design/icons/lib/icons/UnorderedListOutlined";
import HeartFilled from "@ant-design/icons/lib/icons/HeartFilled";
import PushpinFilled from "@ant-design/icons/lib/icons/PushpinFilled";
import StarFilled from "@ant-design/icons/lib/icons/StarFilled";
import EyeOutlined from "@ant-design/icons/lib/icons/EyeOutlined";

import RatingBar from "@/components/UI/RatingBar/RatingBar";
import {
  Image as ANTDImage,
  Popover,
  Modal,
  Select,
  message,
  Button,
  Rate,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import type { Genre } from "@/redux/api/genres/types/MovieListGenreType";
import classNames from "classnames";
import { formatTime } from "@/utils/formatTime";
import { FastAverageColor } from "fast-average-color";
import type { FastAverageColorResult } from "fast-average-color";

import styles from "./MovieDetailsHead.module.scss";
import { createRgbaString } from "@/utils/createRgbaString";
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
  const [addMovieToList, { data: movieList, isLoading }] =
    usePostAddMovieToListMutation();
  const [
    getAccountStates,
    { data: accountStates, isLoading: isAccountStatesLoading },
  ] = useLazyGetMovieAccoutStatesQuery();
  const [addToWatchlist] = usePostAddToWatchlistMutation();
  const [addToFavorite] = usePostAddToFavoriteMutation();
  const [
    rateMovie,
    { data: rateMovieResult, isLoading: isRateMovieResultLoading },
  ] = usePostAddMovieRatingMutation();
  const [fetchAccountLists] = useLazyGetAccountListsQuery();
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const [listId, setListId] = React.useState<string>("");
  const [isListSubmit, setIsListSubmit] = React.useState(false);
  const [isRateSubmit, setIsRateSubmit] = React.useState(false);
  const [isWatchlistSubmit, setIsWatchlistSubmit] = React.useState(false);
  const [isFavoriteSubmit, setIsFavoriteSubmit] = React.useState(false);
  const [isGalleryVisible, setIsGalleryVisible] = React.useState(false);
  const [backdropColor, setBackdropColor] = React.useState<number[] | null>(
    null
  );
  const [isBackdropLight, setIsBackdropLight] = React.useState(false);
  const [rate, setRate] = React.useState<number>(1);
  const { data: certificate } = useGetMovieReleaseDatesQuery(id);

  const [messageApi, contextMessageHolder] = message.useMessage();
  const [modal, contextModalHolder] = Modal.useModal();

  console.log(backdropColor);

  const releaseYear = release_date?.split("-")[0]; // by first "-"

  const onClickAddMovieToList = React.useCallback(() => {
    if (sessionId) {
      const listModal = modal.info({
        title: `Додати "${title}" до списку?`,
      });

      const onChangeList = (value: string) => {
        if (value !== "" && value) {
          setListId(value);
          listModal.update({
            okText: "Підтвердити",
            okButtonProps: { disabled: false },
          });
        }
      };

      fetchAccountLists({ session_id: sessionId }, true)
        .unwrap()
        .then((data) => {
          listModal.update({
            title: `Додати "${title}" до списку?`,
            content: (
              <div>
                <p className={styles.listLabel}>Додати до існуючих списків:</p>
                <Select
                  style={{ width: "100%" }}
                  placeholder={"Оберіть список"}
                  onChange={onChangeList}
                  options={
                    data.results && data.results.length !== 0
                      ? data.results.map((list) => ({
                          value: list.id,
                          label: list.name,
                        }))
                      : undefined
                  }
                  notFoundContent={"Не знайдено жодного списка"}
                />
                <p className={styles.listLabel}>Або:</p>
                <Button type="primary">
                  <Link href={`/lists/new`}>Створити новий список</Link>
                </Button>
              </div>
            ),
            icon: <UnorderedListOutlined />,
            onOk() {
              setIsListSubmit(true);
            },
            onCancel() {},
            okText: "Оберіть список",
            okButtonProps: {
              disabled: true,
              title: "Оберіть список щоб продовжити",
            },
            closable: true,
          });
        });
    }

    if (!sessionId) {
      return;
    }
  }, [sessionId]);

  const onClickAddMovieToWatchlist = () => {
    if (sessionId) {
      setIsWatchlistSubmit(true);
    }
    if (!sessionId) {
      return;
    }
  };

  const onClickAddMovieToFavorite = () => {
    if (sessionId) {
      setIsFavoriteSubmit(true);
    }
    if (!sessionId) {
      return;
    }
  };

  const onClickRateMovie = React.useCallback(() => {
    if (sessionId) {
      const rateModal = modal.info({
        title: `Оцінити "${title}"?`,
      });

      const onChangeRate = (value: number) => {
        if (value) {
          setRate(value);
          rateModal.update({
            okText: "Підтвердити",
            okButtonProps: { disabled: false },
          });
        }
      };

      rateModal.update({
        title: `Оцінити "${title}"?`,
        content: (
          <div>
            <p className={styles.listLabel}>Оберіть вашу оцінку:</p>
            <Rate
              allowClear={false}
              defaultValue={5}
              count={10}
              onChange={onChangeRate}
            />
          </div>
        ),
        onOk() {
          setIsRateSubmit(true);
        },
        icon: <StarFilled />,
        onCancel() {},
        okText: "Оберіть оцінку",
        okButtonProps: {
          disabled: true,
          title: "Оберіть оцінку щоб продовжити",
        },
        closable: true,
      });
    }

    if (!sessionId) {
      return;
    }
  }, [sessionId]);

  React.useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
    // get dominant color by backdrop
    const fac = new FastAverageColor();
    if (backdrop_path) {
      fac
        .getColorAsync(
          `https://image.tmdb.org/t/p/w220_and_h330_face${backdrop_path}`,
          { algorithm: "dominant", crossOrigin: "anonymous" }
        )
        .then((result: FastAverageColorResult) => {
          console.log(result);
          setIsBackdropLight(result.isLight);
          setBackdropColor(result.value);
        })
        .catch((error) => {
          console.error("Ошибка при получении среднего цвета:", error);
        });
    }
  }, [id]);

  React.useEffect(() => {
    if (sessionId) {
      getAccountStates({ movie_id: id, session_id: sessionId });
    }
  }, [sessionId, id]);

  React.useEffect(() => {
    if (isListSubmit) {
      Modal.destroyAll();
      if (sessionId) {
        addMovieToList({
          session_id: sessionId,
          list_id: listId,
          media_id: id,
        })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(
                `"${title}" був успішно доданий до списку #${listId}!`,
                3
              );
            } else {
              messageApi.success(`${data.status_message}`, 3);
            }
          })
          .catch((error) => {
            if (error && error.data.status_code === 8) {
              messageApi.error(
                `Сталась помилка! Елемент "${title}" вже існує в списку #${listId}`,
                5
              );
            } else {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}`,
                5
              );
            }
          })
          .finally(() => setIsListSubmit(false));
      }
    } else {
      return;
    }
  }, [isListSubmit]);

  React.useEffect(() => {
    if (isFavoriteSubmit) {
      if (sessionId) {
        if (accountStates && accountStates.favorite) {
          // delete from watchlist
          addToFavorite({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            favorite: false,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно видалений зі списку уподобань!`,
                  3
                );
              } else {
                messageApi.success(`${data.status_message}`, 3);
              }
            })
            .catch((error) => {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
                5
              );
            })
            .finally(() => setIsFavoriteSubmit(false));
        } else {
          // add to watchlist
          addToFavorite({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            favorite: true,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно доданий до списку уподобань!`,
                  3
                );
              } else {
                messageApi.success(`${data.status_message}`, 3);
              }
            })
            .catch((error) => {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
                5
              );
            })
            .finally(() => setIsFavoriteSubmit(false));
        }
      }
    }
  }, [isFavoriteSubmit]);

  React.useEffect(() => {
    if (isWatchlistSubmit) {
      if (sessionId) {
        if (accountStates && accountStates.watchlist) {
          // delete from watchlist
          addToWatchlist({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            watchlist: false,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно видалений зі списку "Переглянути пізніше"!`,
                  3
                );
              } else {
                messageApi.success(`${data.status_message}`, 3);
              }
            })
            .catch((error) => {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
                5
              );
            })
            .finally(() => setIsWatchlistSubmit(false));
        } else {
          // add to watchlist
          addToWatchlist({
            session_id: sessionId,
            media_type: "movie",
            media_id: id,
            watchlist: true,
          })
            .unwrap()
            .then((data) => {
              if (data.success) {
                messageApi.success(
                  `"${title}" був успішно доданий до списку "Переглянути пізніше"!`,
                  3
                );
              } else {
                messageApi.success(`${data.status_message}`, 3);
              }
            })
            .catch((error) => {
              messageApi.error(
                `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
                5
              );
            })
            .finally(() => setIsWatchlistSubmit(false));
        }
      }
    }
  }, [isWatchlistSubmit]);

  React.useEffect(() => {
    if (isRateSubmit) {
      Modal.destroyAll();
      if (sessionId) {
        rateMovie({ session_id: sessionId, movie_id: id, rating: rate })
          .unwrap()
          .then((data) => {
            if (data.success && data.status_code === 12) {
              messageApi.success(`"${title}" був успішно оцінений!`, 3);
            } else {
              messageApi.success(`${data.status_message}`, 3);
            }
          })
          .catch((error) => {
            messageApi.error(
              `Сталась помилка! Код помилки: ${error.data.status_code}, текст помилки: ${error.data.status_message}`,
              5
            );
          })
          .finally(() => setIsRateSubmit(false));
      }
    }
  }, [isRateSubmit]);

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
                  <ul className={styles.headerActions + " auto"}>
                    <li className={styles.chart}>
                      <RatingBar rating={vote_average} size={55} />
                      <span>Рейтинг</span>
                    </li>
                    <Popover
                      content={
                        <span>
                          {!sessionId &&
                            "Увійдіть, щоби створювати та керувати власними списками"}
                          {sessionId && `Додати до списку`}
                        </span>
                      }
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <button onClick={onClickAddMovieToList}>
                          <span>
                            <UnorderedListOutlined />
                          </span>
                        </button>
                      </li>
                    </Popover>
                    <Popover
                      content={
                        <span>
                          {!sessionId &&
                            "Увійдіть, щоб додати цей фільм до списку вподобань"}
                          {accountStates?.favorite &&
                            sessionId &&
                            `Додано в обране`}
                          {accountStates?.favorite === false &&
                            sessionId &&
                            "Додати в обране"}
                        </span>
                      }
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <button
                          className={classNames({
                            [styles.favorited]: accountStates?.favorite,
                          })}
                          onClick={onClickAddMovieToFavorite}
                        >
                          <span>
                            <HeartFilled />
                          </span>
                        </button>
                      </li>
                    </Popover>
                    <Popover
                      content={
                        <span>
                          {!sessionId &&
                            "Увійдіть, щоб додати цей фільм до списку перегляду"}
                          {accountStates?.watchlist &&
                            sessionId &&
                            `Додано до списку відстежень`}
                          {accountStates?.watchlist === false &&
                            sessionId &&
                            "Додати до списку відстежень"}
                        </span>
                      }
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <button
                          onClick={onClickAddMovieToWatchlist}
                          className={classNames({
                            [styles.watchlist]: accountStates?.watchlist,
                          })}
                        >
                          <span>
                            <PushpinFilled />
                          </span>
                        </button>
                      </li>
                    </Popover>
                    <Popover
                      content={
                        <span>
                          {!sessionId && "Увійдіть, щоб оцінити цей фільм"}
                          {accountStates?.rated &&
                            sessionId &&
                            `Оцінено ${accountStates.rated.value}.0`}
                          {accountStates?.rated === false &&
                            sessionId &&
                            "Оцінити!"}
                        </span>
                      }
                      placement="bottom"
                    >
                      <li className={styles.tooltip}>
                        <button
                          onClick={onClickRateMovie}
                          className={classNames({
                            [styles.rated]: accountStates?.rated,
                          })}
                        >
                          <span>
                            <StarFilled />
                          </span>
                        </button>
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
      {contextMessageHolder}
      {contextModalHolder}
    </div>
  );
};

export default MovieDetailsHead;
