import React from "react";

import classNames from "classnames";
import Image from "next/image";
import RatingBarSmall from "../../RatingBarSmall/RatingBarSmall";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { Typography } from "antd";
import { formatReleaseDate } from "@/utils/formatReleaseDate";
import { formatFirstLetterToUppercase } from "@/utils/formatFirstLetterToUppercase";
import { getRandomColorAvatar } from "@/utils/getRandomColorAvatar";
import type { ReviewResult } from "@/redux/api/types/common";

import styles from "./ReviewCard.module.scss";

interface ReviewCardProps {
  reviewResult: ReviewResult;
  textExpandanle: boolean;
  rowsToExpandle?: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  reviewResult,
  textExpandanle,
  rowsToExpandle = 3,
}) => {
  const { username, avatar_path, rating } = reviewResult.author_details;
  const { author, created_at, url, content } = reviewResult;

  const checkAvatarUrl = (avatarPath: string): string => {
    if (avatarPath.includes("http")) {
      return avatarPath.substring(1);
    } else {
      return `https://image.tmdb.org/t/p/w64_and_h64_face/${avatarPath}`;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <div className={styles.avatar}>
          <a href={url} target="_blank">
            {avatar_path ? (
              <Image
                width={64}
                height={64}
                src={checkAvatarUrl(avatar_path)}
                alt={`${username} profile avatar`}
              />
            ) : (
              <span className={classNames(getRandomColorAvatar())}>
                {author.substring(0, 1)}
              </span>
            )}
          </a>
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            <h3>
              <a href={url}>Рецензія від {author}</a>
            </h3>
            {rating && <RatingBarSmall rating={rating} />}
          </div>
          <h5 className={styles.meta}>
            Написано <span>{author}</span> від{" "}
            {formatFirstLetterToUppercase(
              formatReleaseDate(created_at, "uk", "MMMM DD, YYYY")
            )}
          </h5>
        </div>
      </div>
      <div className={styles.teaser}>
        {textExpandanle ? (
          <Typography.Paragraph>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph ellipsis={{ rows: rowsToExpandle }}>
            <ReactMarkdown>{content}</ReactMarkdown>
          </Typography.Paragraph>
        )}

        {!textExpandanle && (
          <span>
            <Link href={url}>Читати більше</Link>
          </span>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
