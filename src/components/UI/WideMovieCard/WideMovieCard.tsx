import React from "react";
import Link from "next/link";
import Image from "next/image";
import RatingBar from "../RatingBar/RatingBar";
import { Button, Rate, Typography } from "antd";
import { CloseOutlined, UnorderedListOutlined } from "@ant-design/icons";
import { formatReleaseDate } from "@/utils/formatReleaseDate";

import styles from "./WideMovieCard.module.scss";

interface WideMovieCardProps {
  id: number;
  priorityIndex?: number,
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
  rating?: number;

  isShowPanel?: boolean;
  isShowRate?: boolean;
  isRateReadonly?: boolean;
  isShowAddMovie?: boolean;
  isShowDelete?: boolean;

  onClickElementDelete?: (movieId: number, title: string) => void;
  onClickAddMovieToList?: (...args: any) => void;
  onChangeMovieRate?: (...args: any) => void;
}

const WideMovieCard: React.FC<WideMovieCardProps> = ({
  id,
  priorityIndex,
  title,
  vote_average,
  release_date,
  overview,
  rating,
  poster_path,
  isShowPanel,
  isShowAddMovie,
  isShowRate,
  isRateReadonly = true,
  isShowDelete,
  onClickElementDelete,
  onClickAddMovieToList,
  onChangeMovieRate
}) => {
  return (
    <div key={id} className={styles.card}>
      <div className={styles.image}>
        <div className={styles.poster}>
          <Link href={`/movies/${id}`}>
            <Image
              width={150}
              height={225}
              alt={`${title}`}
              src={poster_path}
              priority={priorityIndex ? priorityIndex < 3 : undefined}
            />
          </Link>
        </div>
      </div>
      <div className={styles.details}>
        <div className={styles.detailsMain}>
          <div className={styles.detailsHead}>
            <RatingBar size={38} rating={vote_average} />
            <div className={styles.title}>
              <div>
                <Link href={`/movies/${id}`}>
                  <h2>{title}</h2>
                </Link>
              </div>
              <span className={styles.release}>
                {formatReleaseDate(release_date)}
              </span>
            </div>
          </div>
          <div className={styles.overview}>
            <Typography.Paragraph ellipsis={{ rows: 2 }}>
              {overview}
            </Typography.Paragraph>
          </div>
        </div>
        {isShowPanel && (
          <div className={styles.panel}>
            <ul className={styles.panelList}>
              {isShowPanel && isShowRate ? (
                <li className={styles.option}>
                  Ваша оцінка:
                  <Rate
                    value={rating}
                    count={10}
                    disabled={isRateReadonly}
                    style={{ marginTop: "-5px" }}
                    onChange={onChangeMovieRate}
                  />
                </li>
              ) : undefined}
              {isShowPanel && isShowAddMovie && (
                <li className={styles.option}>
                  <Button
                    shape="circle"
                    onClick={
                      isShowPanel && isShowAddMovie
                        ? onClickAddMovieToList
                        : undefined
                    }
                    icon={<UnorderedListOutlined />}
                  ></Button>
                  Додати до списку
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
      {isShowDelete && onClickElementDelete && (
        <button
          type="button"
          onClick={() => onClickElementDelete(id, title)}
          className={styles.cardDeleteIcon}
        >
          <CloseOutlined />
        </button>
      )}
    </div>
  );
};

export default WideMovieCard;