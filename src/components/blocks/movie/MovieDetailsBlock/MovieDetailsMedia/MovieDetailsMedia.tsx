import React from "react";
import { useInViewport } from "ahooks";

import { Layout, Skeleton } from "antd";
import MovieDetailsCast from "./MovieDetailsCast/MovieDetailsCast";
import MovieDetailsScreens from "./MovieDetailsScreens/MovieDetailsScreens";
import MovieDetailsSocial from "./MovieDetailsSocial/MovieDetailsSocial";
import SiderMedia from "./SiderMedia/SiderMedia";
import dynamic from "next/dynamic";
import type { Collection } from "@/redux/api/movies/types/MovieDetailsType";

import styles from "./MovieDetailsMedia.module.scss";

const MovieDetailsCollection = dynamic(
  () => import("./MovieDetailsCollection/MovieDetailsCollection"),
  {
    loading: () => (
      <div className={styles.skeletonLoader}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    ),
  }
);

const MovieDetailsRecs = dynamic(
  () => import("./MovieDetailsRecs/MovieDetailsRecs"),
  {
    loading: () => (
      <div className={styles.skeletonLoader}>
        <Skeleton active paragraph={{ rows: 5 }} />
      </div>
    ),
  }
);

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
  const collectionRef = React.useRef<HTMLDivElement | null>(null);
  const [isCollectionInViewport] = useInViewport(collectionRef);
  const [isCollectionLoaded, setIsCollectionLoaded] = React.useState(false);
  const { Sider } = Layout;

  React.useEffect(() => {
    if (isCollectionInViewport && !isCollectionLoaded) {
      setIsCollectionLoaded(true);
    }
  }, [collectionData, isCollectionInViewport, isCollectionLoaded]);

  return (
    <div className={styles.media}>
      <div className="app-container content-with-aside">
        <div className="media-content">
          <MovieDetailsCast id={id} />
          <MovieDetailsSocial id={id} />
          <MovieDetailsScreens id={id} />
          <div className={styles.observer} ref={collectionRef}></div>
          {isCollectionLoaded && collectionData && (
            <MovieDetailsCollection collectionData={collectionData} />
          )}
          {isCollectionLoaded && <MovieDetailsRecs id={id} />}
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
    </div>
  );
};

export default MovieDetailsMedia;
