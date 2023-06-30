import React from "react";
import { useLazyGetTrendingMoviesQuery } from "@/redux/api/trending/slice";

import { List, Tabs } from "antd";
import MediaElementCard from "@/components/UI/MediaElementCard/MediaElementCard";
import type { TabsProps } from "antd";
import type { SearchMovie } from "@/redux/api/search/types";

import styles from "./HomeTrendingMovies.module.scss";

enum TabValues {
  DAY = "day",
  WEEK = "week",
}

const HomeTrendingMovies: React.FC = () => {
  const [
    getTrendingMovies,
    {
      data: trendingMovies,
      isFetching: isTrendingAllFetching,
      isError: isTrendingAllError,
    },
  ] = useLazyGetTrendingMoviesQuery();

  const [tabKey, setTabKey] = React.useState<TabValues | string>(TabValues.DAY);

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case TabValues.DAY:
        getTrendingMovies(
          { time_window: TabValues.DAY, params: "language=uk-UA" },
          true
        );
        break;
      case TabValues.WEEK:
        getTrendingMovies(
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
              dataSource={trendingMovies?.results}
              grid={{ gutter: 10 }}
              loading={isTrendingAllFetching}
              renderItem={(element: SearchMovie) => (
                <List.Item className={styles.card} key={element.id}>
                  <MediaElementCard
                    id={element.id}
                    title={element.title}
                    imgUrl={
                      element.poster_path
                        ? `https://image.tmdb.org/t/p/w220_and_h330_face/${element.poster_path}`
                        : `https://placehold.co/260x390/png/?text=No+Image`
                    }
                    description={element.overview}
                    voteAverage={element.vote_average}
                    release={element.release_date}
                    type="movie"
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
              dataSource={trendingMovies?.results}
              grid={{ gutter: 10 }}
              loading={isTrendingAllFetching}
              renderItem={(element: SearchMovie) => (
                <List.Item className={styles.card} key={element.id}>
                  <MediaElementCard
                    id={element.id}
                    title={element.title}
                    imgUrl={
                      element.poster_path
                        ? `https://image.tmdb.org/t/p/w220_and_h330_face/${element.poster_path}`
                        : `https://placehold.co/260x390/png/?text=No+Image`
                    }
                    description={element.overview}
                    voteAverage={element.vote_average}
                    release={element.release_date}
                    type="movie"
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
          tabBarExtraContent={{ left: <h3>Серед фільмів</h3> }}
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

export default HomeTrendingMovies;
