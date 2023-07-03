import React from "react";
import { useGetTVRecsQuery } from "@/redux/api/tv/slice";

import { List, Skeleton } from "antd";
import RecomendationCard from "@/components/UI/RecomendationCard/RecomendationCard";

import styles from "./TVDetailsRecs.module.scss";

interface TVDetailsRecsProps {
  id: number;
}

const TVDetailsRecs: React.FC<TVDetailsRecsProps> = ({ id }) => {
  const { data: recs, isLoading: isRecsLoading } = useGetTVRecsQuery({
    id,
    params: "language=uk-UA",
  });

  return (
    <section className={styles.recs + " panel"}>
      <div className={styles.recsWaypoint}>
        <div className="scroller-wrapper scroller-with-overflow">
          {isRecsLoading && (
            <div className="scroller-wrapper scroller-with-overflow">
              <div className={styles.skeletonWrapper}>
                {[...new Array(6)].map((_, i) => (
                  <Skeleton.Image
                    key={i}
                    style={{ width: "250px", height: "141px" }}
                  />
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
                  renderItem={(rec) => (
                    <List.Item>
                      <RecomendationCard
                        id={rec.id}
                        release_date={rec.first_air_date}
                        poster_path={
                          rec.poster_path
                            ? `https://image.tmdb.org/t/p/w250_and_h141_face${rec.poster_path}`
                            : "https://placehold.co/240x141/png/?text=Not+Found"
                        }
                        title={rec.name}
                        vote_average={rec.vote_average}
                      />
                    </List.Item>
                  )}
                ></List>
              </div>
            </>
          )}
          {recs && recs.length === 0 && (
            <>
              <h3 className={styles.title}>Рекомендації</h3>
              <div className="scroller-wrapper scroller-with-overflow">
                <div className="empty-text--default">
                  Наразі у нас немає достатньо даних для рекомендацій на базі
                  цього елементу.
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TVDetailsRecs;
