import { StarFilled } from "@ant-design/icons";
import React from "react";
import styles from "./RatingBarSmall.module.scss";

interface RatingBarSmall {
  rating: number;
  isRounded?: boolean;
}

const RatingBarSmall: React.FC<RatingBarSmall> = ({ rating, isRounded = true }) => {
  return (
    <div className={styles.rating}>
      <span className={styles.starIcon}>
        <StarFilled />
      </span>
      {isRounded ? `${rating}.0` : rating}
    </div>
  );
};

export default RatingBarSmall;
