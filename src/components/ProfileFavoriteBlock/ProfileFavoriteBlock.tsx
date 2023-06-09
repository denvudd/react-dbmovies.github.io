import React from "react";
import { useLazyGetAccountFavoriteMoviesQuery } from "@/redux/api/account/slice";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select } from "antd";
import WatchlistMovieCard from "../ProfileWatchlistBlock/WatchlitMovieCard/WatchlistMovieCard";
import ProfileTabs from "../UI/ProfileTabs/ProfileTabs";

import styles from './ProfileFavoriteBlock.module.scss';
import ProfileFavoriteCard from "./ProfileFavoriteCard/ProfileFavoriteCard";

interface ProfileFavoriteBlockProps {
  account_id: number;
  session_id: string;
  accountUsername: string;
}

const ProfileFavoriteBlock: React.FC<ProfileFavoriteBlockProps> = ({
  account_id,
  session_id,
  accountUsername,
}) => {
  const [
    getFavoriteMovies,
    {
      data: favoriteMovies,
      isLoading: isFavoriteMoviesLoading,
      isFetching: isFavoriteMoviesFetching,
    },
  ] = useLazyGetAccountFavoriteMoviesQuery();
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
    getFavoriteMovies(
      {
        session_id: session_id,
        account_id: account_id,
        params: `language=uk-UA&sort_by=created_at.desc`,
      },
      true
    );
  }, []);

  React.useEffect(() => {
    if (watchlistSortByRef.current !== watchlistSortBy) {
      getFavoriteMovies(
        {
          session_id: session_id,
          account_id: account_id,
          params: `language=uk-UA&sort_by=created_at.${watchlistSortBy}`,
        },
        true
      );
      watchlistSortByRef.current = watchlistSortBy;
    }
  }, [watchlistSortBy]);

  return (
    <>
      <ProfileTabs
        activeTabIndex={1}
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
        <div className="app-container">
          {isFavoriteMoviesLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          <Spin
            spinning={!isFavoriteMoviesLoading && isFavoriteMoviesFetching}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          >
            {favoriteMovies && favoriteMovies.results && (
              <div className={styles.sortable}>
                <div className={styles.sortableHeader}>
                  <h2 className={styles.sortableTitle}>Мої вподобання</h2>
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
                  {favoriteMovies.results.length === 0 && (
                    <div>Списків для цього аккаунта не знайдено.</div>
                  )}
                  {favoriteMovies.results.length !== 0 && (
                    <>
                      {favoriteMovies.results.map((movie, index) => (
                        <ProfileFavoriteCard
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
                        />
                      ))}
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

export default ProfileFavoriteBlock;
