import React from "react";
import { Progress } from "antd";
import styles from "./RatingBar.module.scss";
import { formatRating } from "@/utils/formatRating";

interface RatingBarProps {
  rating: number;
  size: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ rating, size }) => {
  const getColor = (rating: number) => {
    if (rating >= 75) {
      return "#21d07a";
    } else if (rating >= 50) {
      return "#faad14";
    } else {
      return "#db2360";
    }
  };

  const formattedRating = formatRating(rating);

  return (
    <Progress
      type="circle"
      percent={formattedRating}
      format={(percent) => percent}
      size={size}
      strokeColor={getColor(formattedRating)}
      trailColor="#f5f5f5"
      className={styles.rating}
    />
  );
};

export default RatingBar;
