import React from "react";

import { List, Skeleton } from "antd";
import RecomendationCard from "@/components/UI/cards/RecomendationCard/RecomendationCard";
import type { ListTV } from "@/redux/api/tv/types";
import type { ListMovie } from "@/redux/api/movies/types";

import styles from "./ElementDetailsRecs.module.scss";

interface ElementDetailsRecsProps {
  id: number;
  recs: (ListTV | ListMovie)[] | undefined;
  isLoading: boolean;
}

const ElementDetailsRecs: React.FC<ElementDetailsRecsProps> = ({ id, recs, isLoading }) => {
  const renderRecItem = (item: ListTV | ListMovie) => {
    if ("name" in item) {
      // ListTV
      return (
        <RecomendationCard
          id={item.id}
          release_date={item.first_air_date}
          poster_path={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w250_and_h141_face${item.poster_path}`
              : "https://placehold.co/240x141/png/?text=Not+Found"
          }
          title={item.name}
          vote_average={item.vote_average}
          type="tv"
        />
      );
    } else {
      // ListMovie
      return (
        <RecomendationCard
          id={item.id}
          release_date={item.release_date}
          poster_path={
            item.poster_path
              ? `https://image.tmdb.org/t/p/w250_and_h141_face${item.poster_path}`
              : "https://placehold.co/240x141/png/?text=Not+Found"
          }
          title={item.title}
          vote_average={item.vote_average}
          type="movies"
        />
      );
    }
  };

  return (
    <section className={styles.recs + " panel"}>
      <div className={styles.recsWaypoint}>
        <div>
          {isLoading && (
            <div className="scroller-wrapper scroller-with-overflow">
              <div className={styles.skeletonWrapper}>
                {[...new Array(6)].map((_, i) => (
                  <Skeleton.Image key={i} style={{ width: "250px", height: "141px" }} />
                ))}
              </div>
            </div>
          )}
          {recs && recs.length !== 0 && (
            <>
              <h3 className={styles.title}>Рекомендації</h3>
              <div className="scroller-wrapper scroller-with-overflow">
                <List
                  dataSource={recs.slice(0, 10)}
                  className={"scroller"}
                  itemLayout="horizontal"
                  grid={{
                    gutter: 15,
                  }}
                  renderItem={(item) => <List.Item>{renderRecItem(item)}</List.Item>}
                ></List>
              </div>
            </>
          )}
          {!isLoading && recs && recs.length === 0 && (
            <>
              <h3 className={styles.title}>Рекомендації</h3>
              <div className="scroller-with-overflow">
                <div className="empty-text--default">
                  Наразі у нас немає достатньо даних для рекомендацій на базі цього елементу.
                </div>
              </div>
            </>
          )}
          {!isLoading && !recs && (
            <>
              <h3 className={styles.title}>Рекомендації</h3>
              <div className="scroller-with-overflow">
                <div className="empty-text--default">
                  Не вдалося загрузити рекомендації для цього елементу.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ElementDetailsRecs;