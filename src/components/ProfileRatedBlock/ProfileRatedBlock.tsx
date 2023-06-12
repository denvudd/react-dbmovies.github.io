import React from "react";
import { useLazyGetAccountRatedMoviesQuery } from "@/redux/api/account/slice";

import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Select } from "antd";
import RatedMovieCard from "./RatedMovieCard/RatedMovieCard";
import ProfileTabs from "../UI/ProfileTabs/ProfileTabs";

import styles from "./ProfileRatedBlock.module.scss";
interface ProfileRatedBlockProps {
  account_id: number;
  session_id: string;
  accountUsername: string;
}

const ProfileRatedBlock: React.FC<ProfileRatedBlockProps> = ({
  account_id,
  session_id,
  accountUsername,
}) => {
  const [
    getRatedMovies,
    {
      data: ratedMovies,
      isLoading: isRatedMoviesLoading,
      isFetching: isRatedMoviesFetching,
    },
  ] = useLazyGetAccountRatedMoviesQuery();
  const [ratesSortBy, setRatesSortBy] = React.useState<"asc" | "desc">("desc");
  const ratesSortByRef = React.useRef<"asc" | "desc">(ratesSortBy);

  const onRatesSortChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setRatesSortBy(value);
    }
  };

  React.useEffect(() => {
    getRatedMovies(
      {
        session_id: session_id,
        account_id: account_id,
        params: `language=uk-UA&sort_by=created_at.desc`,
      },
      true
    );
  }, []);

  React.useEffect(() => {
    if (ratesSortByRef.current !== ratesSortBy) {
      getRatedMovies(
        {
          session_id: session_id,
          account_id: account_id,
          params: `language=uk-UA&sort_by=created_at.${ratesSortBy}`,
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
        <div className="app-container">
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

export default ProfileRatedBlock;
