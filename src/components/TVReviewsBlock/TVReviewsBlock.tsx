import React from "react";

import ReviewCard from "../UI/ReviewCard/ReviewCard";
import type { ReviewResult } from "@/redux/api/types/common";

import styles from "./TVReviewsBlock.module.scss";

interface TVReviewsBlockProps {
  reviews: ReviewResult[];
}

const TVReviewsBlock: React.FC<TVReviewsBlockProps> = ({ reviews }) => {
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

export default TVReviewsBlock;
