import React from "react";
import { useLazyGetTrendingAllQuery } from "@/redux/api/trending/slice";

import MediaElementCard from "@/components/UI/cards/MediaElementCard/MediaElementCard";
import { SearchMovie, SearchTV } from "@/redux/api/search/types";
import { List, Tabs } from "antd";
import type { TabsProps } from "antd";

import styles from "./HomeTrendingAll.module.scss";

enum TabValues {
  DAY = "day",
  WEEK = "week",
}

const HomeTrendingAll: React.FC = () => {
  const [
    trendingAll,
    {
      data: trendingAllData,
      isFetching: isTrendingAllFetching,
      isError: isTrendingAllError,
    },
  ] = useLazyGetTrendingAllQuery();

  const [tabKey, setTabKey] = React.useState<TabValues | string>(TabValues.DAY);

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case TabValues.DAY:
        trendingAll(
          { time_window: TabValues.DAY, params: "language=uk-UA" },
          true
        );
        break;
      case TabValues.WEEK:
        trendingAll(
          { time_window: TabValues.WEEK, params: "language=uk-UA" },
          true
        );
        break;
      default:
        () => null;
    }
  };

  React.useEffect(() => {
    handleTabChange(tabKey);
  }, [tabKey]);

  const trendingTypeChecker = (element: SearchMovie | SearchTV) => {
    const { id, poster_path, overview, vote_average } = element;
    
    switch (element.media_type) {
      case "movie":
        return (
          <MediaElementCard
            id={id}
            title={element.title}
            imgUrl={
              poster_path
                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`
                : `https://placehold.co/260x390/png/?text=No+Image`
            }
            description={overview}
            voteAverage={vote_average}
            release={element.release_date}
            type="movie"
            size="small"
          />
        );
      case "tv":
        return (
          <MediaElementCard
            id={id}
            title={element.name}
            imgUrl={
              poster_path
                ? `https://image.tmdb.org/t/p/w220_and_h330_face/${poster_path}`
                : `https://placehold.co/260x390/png/?text=No+Image`
            }
            description={overview}
            voteAverage={vote_average}
            release={element.first_air_date}
            type="tv"
            size="small"
          />
        );
      default:
        return "Not found";
    }
  };

  const trendingAlltabs: TabsProps["items"] = [
    {
      key: TabValues.DAY,
      label: `Сьогодні`,
      children: (
        <div>
          <div className={"scroller-wrapper scroller-with-overflow"}>
            <List
              itemLayout="horizontal"
              className={"scroller"}
              dataSource={trendingAllData?.results}
              grid={{ gutter: 20 }}
              loading={isTrendingAllFetching}
              renderItem={(element: SearchMovie | SearchTV) => (
                <List.Item className={styles.card} key={element.id}>
                  {trendingTypeChecker(element)}
                </List.Item>
              )}
            />
          </div>
        </div>
      ),
    },
    {
      key: TabValues.WEEK,
      label: `Цього тижня`,
      children: (
        <div>
          <div className={"scroller-wrapper scroller-with-overflow"}>
            <List
              itemLayout="horizontal"
              className={"scroller"}
              dataSource={trendingAllData?.results}
              grid={{ gutter: 20 }}
              loading={isTrendingAllFetching}
              renderItem={(element: SearchMovie | SearchTV) => (
                <List.Item className={styles.card} key={element.id}>
                  {trendingTypeChecker(element)}
                </List.Item>
              )}
            ></List>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className={styles.panel + " panel"}>
      <div className="app-container">
        <Tabs
          tabBarExtraContent={{ left: <h3>У тренді</h3> }}
          onChange={handleTabChange}
          activeKey={tabKey}
          tabBarStyle={{ fontWeight: "700", fontSize: "1.1em" }}
          items={trendingAlltabs}
          type="card"
        />
      </div>
    </section>
  );
};

export default HomeTrendingAll;
