import React from "react";
import styles from "./MovieList.module.scss";
interface MovieListProps<T> {
  gutter: number;
  dataSource: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

const MovieList = <T,>({
  gutter,
  dataSource,
  renderItem,
}: MovieListProps<T>) => {
  return (
    <div style={{ gap: gutter }} className={styles.listWrapper}>
      {dataSource.map((item, index) => {
        return renderItem(item, index)
      })}
    </div>
  );
};

export default MovieList;
