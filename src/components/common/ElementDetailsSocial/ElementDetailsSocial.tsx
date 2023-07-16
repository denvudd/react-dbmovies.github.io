import React from "react";

import ReviewCard from "@/components/UI/cards/ReviewCard/ReviewCard";
import classNames from "classnames";
import Link from "next/link";
import { Button, Spin } from "antd";
import type { ReviewResult } from "@/redux/api/types/common";

import styles from "./ElementDetailsSocial.module.scss";

interface MovElementDetailsSocialProps {
  id: number;
  reviews: ReviewResult[] | undefined;
  isLoading: boolean;
  type?: "movie" | "tv";
}

const ElementDetailsSocial: React.FC<MovElementDetailsSocialProps> = ({
  id,
  reviews,
  isLoading,
  type = "movie",
}) => {
  return (
    <section className={styles.social + " panel"}>
      <div className={styles.head}>
        <h3 className={styles.sectionTitle}>Соціальне</h3>
        <ul className={styles.menu}>
          <li className={classNames(styles.menuItem, styles.active)}>
            <span>
              Рецензії{" "}
              <span className={styles.count}>
                {reviews ? reviews.length : 0}
              </span>
            </span>
          </li>
        </ul>
      </div>
      <Spin
        spinning={isLoading}
      >
        <div className={styles.content}>
          <div className={styles.container}>
            {reviews &&
              reviews.length !== 0 &&
              reviews.slice(0, 2).map((review) => {
                return (
                  <ReviewCard
                    key={review.id}
                    reviewResult={review}
                    textExpandanle={false}
                  />
                );
              })}
            {reviews && reviews.length === 0 && (
              <div className="empty-text--default">Поки що немає рецензій.</div>
            )}
          </div>
        </div>
      </Spin>
      {reviews && reviews.length !== 0 && (
        <Button size="small" type="text" className={styles.castButton}>
          <Link href={`/${type ? "movies" : "tv"}/${id}/reviews`} className="bold">
            Прочитати всі рецензії
          </Link>
        </Button>
      )}
    </section>
  );
};

export default ElementDetailsSocial;
