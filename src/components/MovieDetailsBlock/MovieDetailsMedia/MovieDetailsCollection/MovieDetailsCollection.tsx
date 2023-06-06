import React from "react";
import ButtonPrimary from "@/components/UI/ButtonPrimary/ButtonPrimary";
import { Collection } from "@/redux/api/movies/types/MovieDetailsType";
import styles from "./MovieDetailsCollection.module.scss";

interface MovieDetailsCollectionProps {
  collectionData: Collection;
}

const MovieDetailsCollection: React.FC<MovieDetailsCollectionProps> = ({
  collectionData,
}) => {
  const { backdrop_path, name, id, poster_path } = collectionData;
  return (
    <section className={"panel"}>
      <div className={styles.collectionWaypoint}>
        <div
          className={styles.header}
          style={{
            backgroundImage: `linear-gradient(to right, rgba(3, 37, 65, 1) 0%, rgba(3, 37, 65, 0.6) 100%), url(https://image.tmdb.org/t/p/w1440_and_h320_multi_faces${backdrop_path})`,
          }}
        >
          <div className={styles.head}>
            <h2 className={styles.title}>Частина зібрання {name}</h2>
            <ButtonPrimary rounded>
              <a href="">Переглянути колекцію</a>
            </ButtonPrimary>
          </div>
          <div className={styles.poster}>
            <img src={`https://image.tmdb.org/t/p/w185/${poster_path}`} alt="Poster collection" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsCollection;
