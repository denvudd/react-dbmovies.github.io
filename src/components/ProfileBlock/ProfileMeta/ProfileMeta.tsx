import React from "react";
import {
  useLazyGetAccountListsQuery,
  useLazyGetAccountRatedMoviesQuery,
  useLazyGetAccountWatchlistMoviesQuery,
} from "@/redux/api/account/slice";
import { Button, Select, Tabs, TabsProps, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import ProfileListGrid from "./ProfileListGrid/ProfileListGrid";
import RatedMovieCard from "@/components/ProfileBlock/ProfileMeta/RatedMovieCard/RatedMovieCard";
import WatchlistMovieCard from "./WatchlitMovieCard/WatchlistMovieCard";

import styles from "./ProfileMeta.module.scss";
interface ProfileMetaProps {
  accountId: number;
  sessionId: string;
}

const ProfileMeta: React.FC<ProfileMetaProps> = ({ accountId, sessionId }) => {
  const [tabKey, setTabKey] = React.useState("lists");
  const [getLists, { data: lists, isLoading: isListsLoading }] =
    useLazyGetAccountListsQuery();
  const [
    getRatedMovies,
    {
      data: ratedMovies,
      isLoading: isRatedMoviesLoading,
      isFetching: isRatedMoviesFetching,
    },
  ] = useLazyGetAccountRatedMoviesQuery();
  const [
    getWatchlistMovies,
    {
      data: watchlistMovies,
      isLoading: isWatchlistMoviesLoading,
      isFetching: isWatchlistMoviesFetching,
    },
  ] = useLazyGetAccountWatchlistMoviesQuery();

  const [ratesSortBy, setRatesSortBy] = React.useState<"asc" | "desc">("desc");
  const [watchlistSortBy, setWatchlistSortBy] = React.useState<"asc" | "desc">("desc");
  const ratesSortByRef = React.useRef<"asc" | "desc">(ratesSortBy);
  const watchlistSortByRef = React.useRef<"asc" | "desc">(watchlistSortBy);

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case "lists":
        getLists({ session_id: sessionId, account_id: accountId }, true);
        break;
      case "rates":
        getRatedMovies(
          {
            session_id: sessionId,
            account_id: accountId,
            params: `language=uk-UA&sort_by=created_at.desc`,
          },
          true
        );
        break;
      case "watchlist":
        getWatchlistMovies(
          {
            session_id: sessionId,
            account_id: accountId,
            params: `language=uk-UA&sort_by=created_at.desc`,
          },
          true
        );
        
        break;
    }
  };

  if (watchlistMovies) {
    console.log(watchlistMovies.total_results);
  }

  const onRatesSortChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setRatesSortBy(value);
    }
  };

  const onSortWatchlist = (value: string) => {
    if (value === "asc" || value === "desc") {
      setWatchlistSortBy(value);
    }
  };

  React.useEffect(() => {
    if (ratesSortByRef.current !== ratesSortBy) {
      getRatedMovies(
        {
          session_id: sessionId,
          account_id: accountId,
          params: `language=uk-UA&sort_by=created_at.${ratesSortBy}`,
        },
        true
      );
      ratesSortByRef.current = ratesSortBy;
    }
  }, [ratesSortBy]);

  React.useEffect(() => {
    if (watchlistSortByRef.current !== watchlistSortBy) {
      getWatchlistMovies(
        {
          session_id: sessionId,
          account_id: accountId,
          params: `language=uk-UA&sort_by=created_at.${watchlistSortBy}`,
        },
        true
      );
      watchlistSortByRef.current = watchlistSortBy;
    }
  }, [watchlistSortBy]);

  const items: TabsProps["items"] = [
    {
      key: "lists",
      label: `Списки`,
      children: (
        <>
          {isListsLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          {!isListsLoading && lists && (
            <div className={styles.lists}>
              <div className={styles.listsHeader}>
                <h2>Мої списки</h2>
                <Button>
                  <Link href={`/lists/new`}>Створити список</Link>
                </Button>
              </div>
              <div className={styles.listsCards}>
                {lists.results.length === 0 && (
                  <div>Списків для цього аккаунта не знайдено.</div>
                )}
                {lists.results.length !== 0 && (
                  <ProfileListGrid lists={lists.results} />
                )}
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      key: "rates",
      label: `Оцінки`,
      children: (
        <>
          {isRatedMoviesLoading && (
            <div className={styles.loading}>
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
              />
            </div>
          )}
          <Spin
            spinning={!isRatedMoviesLoading && isRatedMoviesFetching}
            indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
          >
            {ratedMovies && ratedMovies.results && (
              <div className={styles.sortable}>
                <div className={styles.sortableHeader}>
                  <h2 className={styles.sortableTitle}>Мої оцінки</h2>
                  <div className={styles.sortableSort}>
                    <div className={styles.sortGroup}>
                      <span className={styles.sortableSortTitle}>Порядок:</span>
                      <Select
                        defaultValue={"desc"}
                        style={{ width: "100%" }}
                        options={[
                          { value: "desc", label: "Оцінені нещодавно" },
                          { value: "asc", label: "Оцінені давно" },
                        ]}
                        onChange={onRatesSortChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.sortableCards}>
                  {ratedMovies.results.length === 0 && (
                    <div>Списків для цього аккаунта не знайдено.</div>
                  )}
                  {ratedMovies.results.length !== 0 && (
                    <>
                      {ratedMovies.results.map((movie, index) => (
                        <RatedMovieCard
                          id={movie.id}
                          key={movie.id}
                          priorityIndex={index}
                          sessionId={sessionId}
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
                        />
                      ))}
                    </>
                  )}
                </div>
              </div>
            )}
          </Spin>
        </>
      ),
    },
    {
      key: "watchlist",
      label: `Переглянути пізніше`,
      children: (
        <>
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
                  <h2 className={styles.sortableTitle}>Мій список перегляду</h2>
                  <div className={styles.sortableSort}>
                    <div className={styles.sortGroup}>
                      <span className={styles.sortableSortTitle}>Порядок:</span>
                      <Select
                        defaultValue={"desc"}
                        style={{ width: "100%" }}
                        options={[
                          { value: "desc", label: "Оцінені нещодавно" },
                          { value: "asc", label: "Оцінені давно" },
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
                      {watchlistMovies.results.map((movie, index) => (
                        <WatchlistMovieCard
                          id={movie.id}
                          key={movie.id}
                          priorityIndex={index}
                          sessionId={sessionId}
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
        </>
      ),
    },
  ];

  React.useEffect(() => {
    handleTabChange(tabKey);
  }, [accountId, sessionId, tabKey]);

  return (
    <div className={styles.page}>
      <div className="app-container">
        <Tabs
          defaultActiveKey="lists"
          items={items}
          onChange={handleTabChange}
          size="large"
          centered
        />
      </div>
    </div>
  );
};

export default ProfileMeta;
