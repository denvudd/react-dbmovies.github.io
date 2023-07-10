import React from "react";
import { useLazyGetAccountRatedQuery } from "@/redux/api/account/slice";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select } from "antd";
import RatedMovieCard from "./RatedMovieCard/RatedMovieCard";
import ProfileTabs from "../UI/ProfileTabs/ProfileTabs";
import Link from "next/link";
import classNames from "classnames";
import type { ListRatedMovie, ListRatedTV } from "@/redux/api/account/types";

import styles from "./ProfileRatedBlock.module.scss";
interface ProfileRatedBlockProps {
  account_id: number;
  session_id: string;
  accountUsername: string;
  mediaType: "movies" | "tv";
}

const ProfileRatedBlock: React.FC<ProfileRatedBlockProps> = ({
  account_id,
  session_id,
  accountUsername,
  mediaType,
}) => {
  const [
    getRated,
    { data: rated, isLoading: isRatedLoading, isFetching: isRatedFetching },
  ] = useLazyGetAccountRatedQuery();
  const [ratesSortBy, setRatesSortBy] = React.useState<"asc" | "desc">("asc");
  const ratesSortByRef = React.useRef<"asc" | "desc">(ratesSortBy);

  const onRatesSortChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setRatesSortBy(value);
    }
  };

  React.useEffect(() => {
    getRated(
      {
        session_id: session_id,
        account_id: account_id,
        params: `language=uk-UA&sort_by=created_at.asc`,
        type: mediaType,
      },
      true
    );
    setRatesSortBy("asc");
    ratesSortByRef.current = ratesSortBy;
  }, []);

  React.useEffect(() => {
    if (ratesSortByRef.current !== ratesSortBy) {
      getRated(
        {
          session_id: session_id,
          account_id: account_id,
          params: `language=uk-UA&sort_by=created_at.${ratesSortBy}`,
          type: mediaType,
        },
        true
      );
      ratesSortByRef.current = ratesSortBy;
    }
  }, [ratesSortBy]);

  return (
    <>
      <ProfileTabs
        activeTabIndex={3}
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
          {isRatedLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          <Spin
            spinning={!isRatedLoading && isRatedFetching}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          >
            {rated && rated.results && (
              <div className={styles.sortable}>
                <div className={styles.sortableHeader}>
                  <div className={styles.titleGroup}>
                    <div>
                      <h2 className={styles.sortableTitle}>Мої оцінки</h2>
                    </div>
                    <div className={styles.navigation}>
                      <h3
                        className={classNames(styles.navItem, {
                          [styles.navItemActive]: mediaType === "movies",
                        })}
                      >
                        <Link href={`/user/${accountUsername}/rated`}>
                          Фільми
                        </Link>
                      </h3>
                      <h3
                        className={classNames(styles.navItem, {
                          [styles.navItemActive]: mediaType === "tv",
                        })}
                      >
                        <Link href={`/user/${accountUsername}/rated/tv`}>
                          ТБ
                        </Link>
                      </h3>
                    </div>
                  </div>
                  <div className={styles.sortableSort}>
                    <div className={styles.sortGroup}>
                      <span className={styles.sortableSortTitle}>Порядок:</span>
                      <Select
                        defaultValue={"asc"}
                        style={{ width: "100%" }}
                        options={[
                          { value: "asc", label: "Оцінені нещодавно" },
                          { value: "desc", label: "Оцінені давно" },
                        ]}
                        onChange={onRatesSortChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.sortableCards}>
                  {rated.results.length === 0 && (
                    <div>Списків для цього аккаунта не знайдено.</div>
                  )}
                  {rated.results.length !== 0 && (
                    <>
                      {rated.results.map((element, index) => {
                        if (mediaType === "movies") {
                          const movie = element as ListRatedMovie;
                          return (
                            <RatedMovieCard
                              id={movie.id}
                              key={movie.id}
                              priorityIndex={index}
                              sessionId={session_id}
                              title={movie.title}
                              overview={movie.overview}
                              vote_average={movie.vote_average}
                              release_date={movie.release_date}
                              rating={movie.rating}
                              poster_path={
                                movie.poster_path
                                  ? `https://image.tmdb.org/t/p/w150_and_h225_bestv2${movie.poster_path}`
                                  : "https://placehold.co/150x225/png/?text=Not+Found"
                              }
                              type="movies"
                            />
                          );
                        } else {
                          const tvShow = element as ListRatedTV;
                          return (
                            <RatedMovieCard
                              id={tvShow.id}
                              key={tvShow.id}
                              priorityIndex={index}
                              sessionId={session_id}
                              title={tvShow.name}
                              overview={tvShow.overview}
                              vote_average={tvShow.vote_average}
                              release_date={tvShow.first_air_date}
                              rating={tvShow.rating}
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

export default ProfileRatedBlock;
