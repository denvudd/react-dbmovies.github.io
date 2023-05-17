import React from "react";
import styles from "./MovieDetailsRecs.module.scss";
import { List, Skeleton } from "antd";
import RecomendationCard from "@/components/RecomendationCard/RecomendationCard";
import { useGetMovieRecsQuery } from "@/redux/api/movies/slice";

interface MovieDetailsRecsProps {
  id: number;
}

const MovieDetailsRecs: React.FC<MovieDetailsRecsProps> = ({ id }) => {
  const { data: recs, isLoading: isRecsLoading } = useGetMovieRecsQuery({
    id,
    params: "language=uk-UA",
  });

  return (
    <section className={styles.recs + " panel"}>
      <div className={styles.recsWaypoint}>
        <h3>Рекомендації</h3>
        <div className="scroller-wrapper">
          {isRecsLoading && (
            <>
              {[...new Array(6)].map((_, i) => (
                <Skeleton.Image
                  key={i}
                  style={{ width: "250px", height: "141px" }}
                />
              ))}
            </>
          )}
          {recs && recs.length !== 0 && (
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
                    release_date={rec.release_date}
                    poster_path={
                      rec.poster_path
                        ? `https://image.tmdb.org/t/p/w250_and_h141_face${rec.poster_path}`
                        : "https://placehold.co/240x141/png/?text=Not+Found"
                    }
                    title={rec.title}
                    vote_average={rec.vote_average}
                  />
                </List.Item>
              )}
            ></List>
          )}
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsRecs;
