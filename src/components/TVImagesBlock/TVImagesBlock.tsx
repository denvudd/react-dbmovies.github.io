import React from "react";

import ImageCard from "../UI/ImageCard/ImageCard";
import MovieList from "../UI/MovieList/MovieList";
import type { Image } from "@/redux/api/types/common";

import styles from "./TVImagesBlock.module.scss";

interface TVImagesBlockProps {
  images: Image[];
  name: string;
  type: "backdrop" | "logo" | "poster";
}

const TVImagesBlock: React.FC<TVImagesBlockProps> = ({
  images,
  name,
  type,
}) => {
  const getTitle = (type: TVImagesBlockProps["type"]) => {
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
            <ImageCard title={name} image={image} type={type} />
          )}
        />
      ) : (
        <div className={styles.empty}>До цього запису не додано матеріалу.</div>
      )}
    </div>
  );
};

export default TVImagesBlock;
