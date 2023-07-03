import React from "react";
import { useGetTVReviewsQuery } from "@/redux/api/tv/slice";

import ReviewCard from "@/components/UI/ReviewCard/ReviewCard";
import classNames from "classnames";
import Link from "next/link";
import { Button } from "antd";

import styles from "./TVDetailsSocial.module.scss";

interface MovieDetailsSocialProps {
  id: number;
}

const TVDetailsSocial: React.FC<MovieDetailsSocialProps> = ({ id }) => {
  const { data: reviews, isLoading: isReviewsLoading } = useGetTVReviewsQuery({
    id,
  });

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
          {reviews &&
            reviews.results.length !== 0 &&
            reviews.results.slice(0, 2).map((review) => {
              return (
                <ReviewCard
                  key={review.id}
                  reviewResult={review}
                  textExpandanle={false}
                />
              );
            })}
          {reviews && reviews.results.length === 0 && (
            <div className="empty-text--default">Поки що немає рецензій.</div>
          )}
        </div>
      </div>
      {reviews && reviews.results.length !== 0 && (
        <Button size="small" type="text" className={styles.castButton}>
          <Link href={`/tv/${id}/reviews`} className="bold">
            Прочитати всі рецензії
          </Link>
        </Button>
      )}
    </section>
  );
};

export default TVDetailsSocial;
