import { useLazyGetMovieImagesQuery } from "@/redux/movies/slice";
import React from "react";
import styles from "./MovieDetailsMedia.module.scss";
import { Layout } from "antd";

import MovieDetailsCast from "./MovieDetailsCast/MovieDetailsCast";
import MovieDetailsScreens from "./MovieDetailsScreens/MovieDetailsScreens";
import MovieDetailsCollection from "./MovieDetailsCollection/MovieDetailsCollection";
import { Collection } from "@/redux/movies/types/MovieDetailsType";
import MovieDetailsRecs from "./MovieDetailsRecs/MovieDetailsRecs";
import SiderMedia from "./SiderMedia/SiderMedia";

interface MovieDetailsMediaProps {
  id: number;
  collectionData: Collection | null;
  original_title: string;
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  original_language: string;
  budget: number;
  revenue: number;
}

const MovieDetailsMedia: React.FC<MovieDetailsMediaProps> = ({
  id,
  collectionData,
  original_language,
  original_title,
  status,
  budget,
  revenue,
}) => {
  const { Sider } = Layout;
  return (
    <div className={styles.media}>
      <Layout>
        <div className="app-container content-with-aside">
          <div className="media-content">
            <MovieDetailsCast id={id} />
            <MovieDetailsScreens id={id} />
            {collectionData && (
              <MovieDetailsCollection collectionData={collectionData} />
            )}
            <MovieDetailsRecs id={id} />
          </div>
          <Sider theme="light" className={styles.sider}>
            <SiderMedia
              id={id}
              original_title={original_title}
              original_language={original_language}
              status={status}
              budget={budget}
              revenue={revenue}
            />
          </Sider>
        </div>
      </Layout>
    </div>
  );
};

export default MovieDetailsMedia;
