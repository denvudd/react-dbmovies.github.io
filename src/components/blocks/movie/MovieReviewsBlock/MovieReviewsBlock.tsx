import React from "react";

import ReviewCard from "../../../UI/cards/ReviewCard/ReviewCard";
import type { ReviewResult } from "@/redux/api/types/common";

import styles from "./MovieReviewsBlock.module.scss";

interface MovieReviewsBlockProps {
  reviews: ReviewResult[];
}

const MovieReviewsBlock: React.FC<MovieReviewsBlockProps> = ({ reviews }) => {
  return (
    <>
      <h2 className={styles.title}>
        Рецензії <span>{reviews.length}</span>
      </h2>
      <div className={styles.container}>
        {reviews.map((review) => (
          <ReviewCard
            reviewResult={review}
            textExpandanle={true}
            rowsToExpandle={4}
          />
        ))}
      </div>
      {reviews.length === 0 && (
        <div className={styles.empty}>
          До цього запису не додано матеріалів.
        </div>
      )}
    </>
  );
};

export default MovieReviewsBlock;
