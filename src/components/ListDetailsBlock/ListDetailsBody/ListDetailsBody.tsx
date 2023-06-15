import React from "react";

import ListMovieCard from "@/components/UI/ListMovieCard/ListMovieCard";
import { calcAverageInObject } from "@/utils/calcAverageInObject";
import type { ListMovie } from "@/redux/api/movies/types";

import styles from "./ListDetailsBody.module.scss";
interface ListDetailsBodyProps {
  favorite_count: number;
  items: ListMovie[];
  item_count: number;
}

const ListDetailsBody: React.FC<ListDetailsBodyProps> = ({
  favorite_count,
  items,
  item_count,
}) => {
  return (
    <div>
      <section className={styles.info}>
        <div className="app-container">
          <ul className={styles.infoList}>
            <li>
              <span>
                <em>{item_count}</em>
              </span>
              <br />
              позицій в цьому переліку
            </li>
            <li>
              <span>
                <em>{favorite_count}</em>
              </span>
              <br />
              кількість улюблених позицій
            </li>
            <li>
              <span>
                <em>{calcAverageInObject(items, "vote_average", "to2")}</em>
              </span>
              <br />
              усереднений рейтинг
            </li>
            <li>
              <span>
                <em>{calcAverageInObject(items, "vote_count", "to0")}</em>
              </span>
              <br />
              усереднена кількість оцінок
            </li>
          </ul>
        </div>
      </section>
      <section className={styles.results}>
        <div className="app-container">
          <ul className={styles.listResults}>
            {items.map((movie, index) => (
              <li key={movie.id} className={styles.item}>
                <ListMovieCard movie={movie} index={index} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default ListDetailsBody;
