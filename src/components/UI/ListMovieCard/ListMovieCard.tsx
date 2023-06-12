import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { ListMovie } from "@/redux/api/movies/types";
import RatingBar from "../RatingBar/RatingBar";
import { truncateString } from "@/utils/truncateString";

import styles from "./ListMovieCard.module.scss";
interface ListMovieCardProps {
  movie: ListMovie;
  index: number;
}

const ListMovieCard: React.FC<ListMovieCardProps> = ({ movie, index }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.image}>
          <Link href={`/movies/${movie.id}`}>
            <Image
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w185_and_h278_multi_faces/${movie.poster_path}`
                  : `https://placehold.co/185x278/png/?text=No+Image`
              }
              width={185}
              height={278}
              alt={`${movie.title}`}
            />
          </Link>
        </div>
        <div className={styles.strip}>
          <div className={styles.number}>
            <span>{index + 1}</span>
          </div>
          <div className={styles.meta}>
            <p className={styles.title}>
              <Link href={`/movies/${movie.id}`}>
                {truncateString(movie.title, 20)}
              </Link>
            </p>
          </div>
        </div>
        <div className={styles.rating}>
          <RatingBar rating={movie.vote_average} size={33} />
        </div>
      </div>
    </div>
  );
};

export default ListMovieCard;
