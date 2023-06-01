import React from "react";
import {
  useLazyGetAccountListsQuery,
  useLazyGetAccountRatedMoviesQuery,
} from "@/redux/api/account/slice";
import { Button, Select, Tabs, TabsProps, Spin, Modal } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Link from "next/link";
import ProfileListGrid from "./ProfileListGrid/ProfileListGrid";
import RatedMovieCard from "@/components/UI/RatedMovieCard/RatedMovieCard";

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
    getRated,
    { data: rated, isLoading: isRatedLoading, isFetching: isRatedFetching },
  ] = useLazyGetAccountRatedMoviesQuery();

  const [sortBy, setSortBy] = React.useState<"asc" | "desc">("desc");
  const sortByRef = React.useRef<"asc" | "desc">(sortBy);

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case "lists":
        getLists({ session_id: sessionId, account_id: accountId }, true);
        break;
      case "rates":
        getRated(
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

  const onSortChange = (value: string) => {
    if (value === "asc" || value === "desc") {
      setSortBy(value);
    }
  };

  React.useEffect(() => {
    if (sortByRef.current !== sortBy) {
      getRated(
        {
          session_id: sessionId,
          account_id: accountId,
          params: `language=uk-UA&sort_by=created_at.${sortBy}`,
        },
        true
      );
      sortByRef.current = sortBy;
    }
  }, [sortBy]);

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
            {rated && rated.results.length && (
              <div className={styles.rates}>
                <div className={styles.ratesHeader}>
                  <h2 className={styles.ratesTitle}>Мої оцінки</h2>
                  <div className={styles.ratesSort}>
                    <div className={styles.sortGroup}>
                      <span className={styles.ratesSortTitle}>Порядок:</span>
                      <Select
                        defaultValue={"desc"}
                        style={{ width: "100%" }}
                        options={[
                          { value: "desc", label: "Оцінені нещодавно" },
                          { value: "asc", label: "Оцінені давно" },
                        ]}
                        onChange={onSortChange}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.ratesCards}>
                  {rated.results.length === 0 && (
                    <div>Списків для цього аккаунта не знайдено.</div>
                  )}
                  {rated.results.length !== 0 && (
                    <>
                      {rated.results.map((movie) => (
                        <RatedMovieCard
                          id={movie.id}
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
          {/* {!isRatedLoading && rated && (
            
          )} */}
        </>
      ),
    },
    {
      key: "watchLater",
      label: `Переглянути пізніше`,
      children: `Content of Tab Pane 3`,
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
