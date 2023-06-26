import React from "react";
import { useGetMovieReviewsQuery } from "@/redux/api/movies/slice";

import ReviewCard from "@/components/UI/ReviewCard/ReviewCard";
import classNames from "classnames";

import { Button, Typography } from "antd";
import styles from "./MovieDetailsSocial.module.scss";

interface MovieDetailsSocialProps {
  id: number;
}

const MovieDetailsSocial: React.FC<MovieDetailsSocialProps> = ({ id }) => {
  const { data: reviews, isLoading: isReviewsLoading } =
    useGetMovieReviewsQuery({ id });

  return (
    <section className={styles.social + " panel"}>
      <div className={styles.head}>
        <h3 className={styles.sectionTitle}>Соціальне</h3>
        <ul className={styles.menu}>
          <li className={classNames(styles.menuItem, styles.active)}>
            <span>
              Рецензії{" "}
              <span className={styles.count}>{reviews?.results.length}</span>
            </span>
          </li>
        </ul>
      </div>
      <div className={styles.content}>
        <div className={styles.container}>
          {reviews?.results.slice(0, 2).map((review) => {
            return (
              <ReviewCard
                key={review.id}
                reviewResult={review}
                textExpandanle={true}
              />
            );
          })}
        </div>
      </div>
      <Button size="small" type="text">
        <Typography.Link className="bold">
          Прочитати всі рецензії
        </Typography.Link>
      </Button>
    </section>
  );
};

export default MovieDetailsSocial;
