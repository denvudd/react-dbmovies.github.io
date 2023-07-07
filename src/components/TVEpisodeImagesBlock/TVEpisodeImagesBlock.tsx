import React from "react";

import MovieList from "../UI/MovieList/MovieList";
import ImageCard from "../UI/ImageCard/ImageCard";
import type { Image } from "@/redux/api/types/common";

import styles from './TVEpisodeImagesBlock.module.scss'

interface TVEpisodeImagesBlockProps {
  images: Image[];
  tvName: string;
  episodeName: string;
}

const TVEpisodeImagesBlock: React.FC<TVEpisodeImagesBlockProps> = ({
  images,
  tvName,
  episodeName,
}) => {
  console.log(images);
  
  return (
    <div className="app-container">
      <h2 className={styles.title}>
        Зображення для "{episodeName}", серіалу "{tvName}" <span>{images.length}</span>
      </h2>
      {images.length !== 0 ? (
        <MovieList
          gutter={10}
          dataSource={images}
          renderItem={(image: Image) => (
            <ImageCard title={tvName} image={image} type={"backdrop"} />
          )}
        />
      ) : (
        <div className={styles.empty}>До цього запису не додано матеріалу.</div>
      )}
    </div>
  );
};

export default TVEpisodeImagesBlock;
