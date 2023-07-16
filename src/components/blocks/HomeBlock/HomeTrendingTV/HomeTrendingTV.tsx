import React from "react";
import { useLazyGetTrendingTVQuery } from "@/redux/api/trending/slice";

import MediaElementCard from "@/components/UI/cards/MediaElementCard/MediaElementCard";
import { List, Tabs } from "antd";
import type { SearchTV } from "@/redux/api/search/types";
import type { TabsProps } from "antd";

import styles from "./HomeTrendingTV.module.scss";

enum TabValues {
  DAY = "day",
  WEEK = "week",
}

const HomeTrendingTV = () => {
  const [
    getTrendingTV,
    {
      data: trendingTV,
      isFetching: isTrendingAllFetching,
      isError: isTrendingAllError,
    },
  ] = useLazyGetTrendingTVQuery();

  const [tabKey, setTabKey] = React.useState<TabValues | string>(TabValues.DAY);

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case TabValues.DAY:
        getTrendingTV(
          { time_window: TabValues.DAY, params: "language=uk-UA" },
          true
        );
        break;
      case TabValues.WEEK:
        getTrendingTV(
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

  const trendingMoviesTabs: TabsProps["items"] = [
    {
      key: TabValues.DAY,
      label: `Сьогодні`,
      children: (
        <div>
          <div className={"scroller-wrapper scroller-with-overflow"}>
            <List
              itemLayout="horizontal"
              className={"scroller"}
              dataSource={trendingTV?.results}
              grid={{ gutter: 20 }}
              loading={isTrendingAllFetching}
              renderItem={(element: SearchTV) => (
                <List.Item className={styles.card} key={element.id}>
                  <MediaElementCard
                    id={element.id}
                    title={element.name}
                    imgUrl={
                      element.poster_path
                        ? `https://image.tmdb.org/t/p/w220_and_h330_face/${element.poster_path}`
                        : `https://placehold.co/260x390/png/?text=No+Image`
                    }
                    description={element.overview}
                    voteAverage={element.vote_average}
                    release={element.first_air_date}
                    type="tv"
                    size="small"
                  />
                </List.Item>
              )}
            ></List>
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
              dataSource={trendingTV?.results}
              grid={{ gutter: 20 }}
              loading={isTrendingAllFetching}
              renderItem={(element: SearchTV) => (
                <List.Item className={styles.card} key={element.id}>
                  <MediaElementCard
                    id={element.id}
                    title={element.name}
                    imgUrl={
                      element.poster_path
                        ? `https://image.tmdb.org/t/p/w220_and_h330_face/${element.poster_path}`
                        : `https://placehold.co/260x390/png/?text=No+Image`
                    }
                    description={element.overview}
                    voteAverage={element.vote_average}
                    release={element.first_air_date}
                    type="tv"
                    size="small"
                  />
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
          tabBarExtraContent={{ left: <h3>Серед серіалів</h3> }}
          onChange={handleTabChange}
          activeKey={tabKey}
          tabBarStyle={{ fontWeight: "700", fontSize: "1.1em" }}
          items={trendingMoviesTabs}
          type="card"
        />
      </div>
    </section>
  );
};

export default HomeTrendingTV;
