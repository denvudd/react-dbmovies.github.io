import React from "react";
import { useLazyGetAccountWatchlistQuery } from "@/redux/api/account/slice";

import ProfileTabs from "@/components/UI/tabs/ProfileTabs/ProfileTabs";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select } from "antd";
import WatchlistMovieCard from "./WatchlitMovieCard/WatchlistMovieCard";
import classNames from "classnames";
import Link from "next/link";
import type { ListMovie } from "@/redux/api/movies/types";
import type { ListTV } from "@/redux/api/tv/types";

import styles from "./ProfileWatchlistBlock.module.scss";

interface ProfileWatchlistBlockProps {
  account_id: number;
  session_id: string;
  accountUsername: string;
  type: "movies" | "tv";
}

const ProfileWatchlistBlock: React.FC<ProfileWatchlistBlockProps> = ({
  account_id,
  session_id,
  accountUsername,
  type,
}) => {
  const [
    getWatchlistMovies,
    {
      data: watchlistMovies,
      isLoading: isWatchlistMoviesLoading,
      isFetching: isWatchlistMoviesFetching,
    },
  ] = useLazyGetAccountWatchlistQuery();
  const [watchlistSortBy, setWatchlistSortBy] = React.useState<"asc" | "desc">(
    "desc"
  );
  const watchlistSortByRef = React.useRef<"asc" | "desc">(watchlistSortBy);

  const onSortWatchlist = (value: string) => {
    if (value === "asc" || value === "desc") {
      setWatchlistSortBy(value);
    }
  };

  React.useEffect(() => {
    getWatchlistMovies(
      {
        session_id: session_id,
        account_id: account_id,
        params: `language=uk-UA&sort_by=created_at.desc`,
        type,
      },
      true
    );
  }, []);

  React.useEffect(() => {
    if (watchlistSortByRef.current !== watchlistSortBy) {
      getWatchlistMovies(
        {
          session_id: session_id,
          account_id: account_id,
          params: `language=uk-UA&sort_by=created_at.${watchlistSortBy}`,
          type,
        },
        true
      );
      watchlistSortByRef.current = watchlistSortBy;
    }
  }, [watchlistSortBy]);
  return (
    <>
      <ProfileTabs
        activeTabIndex={4}
        tabs={[
          { label: "Огляд", link: `/user/${accountUsername}` },
          { label: "Уподобання", link: `/user/${accountUsername}/favorite` },
          { label: "Списки", link: `/user/${accountUsername}/lists` },
          { label: "Оцінки", link: `/user/${accountUsername}/rated` },
          {
            label: "Перегляну пізніше",
            link: `/user/${accountUsername}/watchlist`,
          },
        ]}
      />
      <div className={styles.page}>
        <div className="app-container panel-details">
          {isWatchlistMoviesLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          <Spin
            spinning={!isWatchlistMoviesLoading && isWatchlistMoviesFetching}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          >
            {watchlistMovies && watchlistMovies.results && (
              <div className={styles.sortable}>
                <div className={styles.sortableHeader}>
                  <div className={styles.titleGroup}>
                    <div>
                      <h2 className={styles.sortableTitle}>Мої вподобання</h2>
                    </div>
                    <div className={styles.navigation}>
                      <h3
                        className={classNames(styles.navItem, {
                          [styles.navItemActive]: type === "movies",
                        })}
                      >
                        <Link href={`/user/${accountUsername}/watchlist`}>
                          Фільми
                        </Link>
                      </h3>
                      <h3
                        className={classNames(styles.navItem, {
                          [styles.navItemActive]: type === "tv",
                        })}
                      >
                        <Link href={`/user/${accountUsername}/watchlist/tv`}>
                          ТБ
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className={styles.sortableSort}>
                    <div className={styles.sortGroup}>
                      <span className={styles.sortableSortTitle}>Порядок:</span>
                      <Select
                        defaultValue={"desc"}
                        style={{ width: "100%" }}
                        options={[
                          { value: "desc", label: "Додані нещодавно" },
                          { value: "asc", label: "Додані давно" },
                        ]}
                        onChange={onSortWatchlist}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.sortableCards}>
                  {watchlistMovies.results.length === 0 && (
                    <div>Списків для цього аккаунта не знайдено.</div>
                  )}
                  {watchlistMovies.results.length !== 0 && (
                    <>
                      {watchlistMovies.results.map((element, index) => {
                        if (type === "movies") {
                          const movie = element as ListMovie;
                          return (
                            <WatchlistMovieCard
                              id={movie.id}
                              key={movie.id}
                              priorityIndex={index}
                              sessionId={session_id}
                              title={movie.title}
                              overview={movie.overview}
                              vote_average={movie.vote_average}
                              release_date={movie.release_date}
                              poster_path={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${movie.poster_path}`
                                  : "https://placehold.co/150x225/png/?text=Not+Found"
                              }
                              type="movies"
                            />
                          );
                        } else {
                          const tvShow = element as ListTV;
                          return (
                            <WatchlistMovieCard
                              id={tvShow.id}
                              key={tvShow.id}
                              priorityIndex={index}
                              sessionId={session_id}
                              title={tvShow.name}
                              overview={tvShow.overview}
                              vote_average={tvShow.vote_average}
                              release_date={tvShow.first_air_date}
                              poster_path={
                                tvShow.poster_path
                                  ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${tvShow.poster_path}`
                                  : "https://placehold.co/150x225/png/?text=Not+Found"
                              }
                              type="tv"
                            />
                          );
                        }
                      })}
                    </>
                  )}
                </div>
              </div>
            )}
          </Spin>
        </div>
      </div>
    </>
  );
};

export default ProfileWatchlistBlock;
