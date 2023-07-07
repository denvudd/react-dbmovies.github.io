import { StarFilled } from "@ant-design/icons";
import React from "react";
import styles from "./RatingBarSmall.module.scss";

interface RatingBarSmall {
  rating: number;
}

const RatingBarSmall: React.FC<RatingBarSmall> = ({ rating }) => {
  const formatLocalRating = (rating: number) => {
    if (rating) {
      return rating.toFixed(1);
    } else {
      return rating.toFixed(2);
    }
  };

  return (
    <div className={styles.rating}>
      <span className={styles.starIcon}>
        <StarFilled />
      </span>
      {formatLocalRating(rating)}
    </div>
  );
};

export default RatingBarSmall;
