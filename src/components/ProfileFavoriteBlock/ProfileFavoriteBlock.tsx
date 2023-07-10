import React from "react";
import { useLazyGetAccountFavoriteQuery } from "@/redux/api/account/slice";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select } from "antd";
import ProfileTabs from "../UI/ProfileTabs/ProfileTabs";
import classNames from "classnames";
import Link from "next/link";
import ProfileFavoriteCard from "./ProfileFavoriteCard/ProfileFavoriteCard";
import type { ListMovie } from "@/redux/api/movies/types";
import type { ListTV } from "@/redux/api/tv/types";

import styles from "./ProfileFavoriteBlock.module.scss";

interface ProfileFavoriteBlockProps {
  account_id: number;
  session_id: string;
  accountUsername: string;
  mediaType: "movies" | "tv";
}

const ProfileFavoriteBlock: React.FC<ProfileFavoriteBlockProps> = ({
  account_id,
  session_id,
  accountUsername,
  mediaType,
}) => {
  const [
    getFavorite,
    {
      data: favorite,
      isLoading: isFavoriteLoading,
      isFetching: isFavoriteFetching,
    },
  ] = useLazyGetAccountFavoriteQuery();
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
    getFavorite(
      {
        session_id: session_id,
        account_id: account_id,
        params: `language=uk-UA&sort_by=created_at.desc`,
        type: mediaType,
      },
      true
    );
  }, []);

  React.useEffect(() => {
    if (watchlistSortByRef.current !== watchlistSortBy) {
      getFavorite(
        {
          session_id: session_id,
          account_id: account_id,
          params: `language=uk-UA&sort_by=created_at.${watchlistSortBy}`,
          type: mediaType,
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
        <div className="app-container panel-details">
          {isFavoriteLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          <Spin
            spinning={!isFavoriteLoading && isFavoriteFetching}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          >
            {favorite && favorite.results && (
              <div className={styles.sortable}>
                <div className={styles.sortableHeader}>
                  <div className={styles.titleGroup}>
                    <div>
                      <h2 className={styles.sortableTitle}>Мої вподобання</h2>
                    </div>
                    <div className={styles.navigation}>
                      <h3
                        className={classNames(styles.navItem, {
                          [styles.navItemActive]: mediaType === "movies",
                        })}
                      >
                        <Link href={`/user/${accountUsername}/favorite`}>
                          Фільми
                        </Link>
                      </h3>
                      <h3
                        className={classNames(styles.navItem, {
                          [styles.navItemActive]: mediaType === "tv",
                        })}
                      >
                        <Link href={`/user/${accountUsername}/favorite/tv`}>
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
                  {favorite.results.length === 0 && (
                    <div>Списків для цього аккаунта не знайдено.</div>
                  )}
                  {favorite.results.length !== 0 && (
                    <>
                      {favorite.results.map((element, index) => {
                        if (mediaType === "movies") {
                          const movie = element as ListMovie;
                          return (
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
                              type="movies"
                            />
                          );
                        } else {
                          const tvShow = element as ListTV;
                          return (
                            <ProfileFavoriteCard
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

export default ProfileFavoriteBlock;
