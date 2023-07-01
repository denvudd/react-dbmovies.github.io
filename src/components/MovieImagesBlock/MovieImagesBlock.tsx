import React from "react";

import ImageCard from "../UI/ImageCard/ImageCard";
import MovieList from "../UI/MovieList/MovieList";
import type { Image } from "@/redux/api/movies/types";

import styles from "./MovieImagesBlock.module.scss";

interface MovieBackdropsBlockProps {
  images: Image[];
  title: string;
  type: "backdrop" | "logo" | "poster";
}

const MovieImagesBlock: React.FC<MovieBackdropsBlockProps> = ({
  images,
  title,
  type,
}) => {
  const getTitle = (type: MovieBackdropsBlockProps["type"]) => {
    switch (type) {
      case "backdrop":
        return "Світлини";
      case "logo":
        return "Логотипи";
      case "poster":
        return "Постери";
    }
  };
  return (
    <div className="app-container">
      <h2 className={styles.title}>
        {getTitle(type)} <span>{images.length}</span>
      </h2>
      {images.length !== 0 ? (
        <MovieList
          gutter={10}
          dataSource={images}
          renderItem={(image: Image) => (
            <ImageCard title={title} image={image} type={type} />
          )}
        />
      ) : (
        <div className={styles.empty}>До цього запису не додано матеріалу.</div>
      )}
    </div>
  );
};

export default MovieImagesBlock;
