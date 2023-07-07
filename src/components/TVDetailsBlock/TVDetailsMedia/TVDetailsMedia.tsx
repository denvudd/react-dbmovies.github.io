import React from "react";
import { useInViewport } from "ahooks";

import { Layout, Skeleton } from "antd";
import TVDetailsCast from "./TVDetailsCast/TVDetailsCast";
import TVDetailsScreens from "./TVDetailsScreens/TVDetailsScreens";
import TVDetailsSocial from "./TVDetailsSocial/TVDetailsSocial";
import TVDetailsSeason from "./TVDetailsSeason/TVDetailsSeason";
import SiderMedia from "./SiderMedia/SiderMedia";
import dynamic from "next/dynamic";
import type {
  Season,
  TVDetailsApiResponse,
} from "@/redux/api/tv/types";
import type { Network } from "@/redux/api/types/common";

import styles from "./TVDetailsMedia.module.scss";

const TVDetailsRecs = dynamic(() => import("./TVDetailsRecs/TVDetailsRecs"), {
  loading: () => (
    <div className={styles.skeletonLoader}>
      <Skeleton active paragraph={{ rows: 5 }} />
    </div>
  ),
});

interface TVDetailsMediaProps {
  id: number;
  name: string;
  original_name: string;
  status: TVDetailsApiResponse["status"];
  original_language: string;
  networks: Network[];
  type: TVDetailsApiResponse["type"];
  lastSeason: Season;
  homepage: string | null;
}

const TVDetailsMedia: React.FC<TVDetailsMediaProps> = ({
  id,
  name,
  original_language,
  original_name,
  status,
  networks,
  type,
  homepage,
  lastSeason,
}) => {
  const collectionRef = React.useRef<HTMLDivElement | null>(null);
  const [isCollectionInViewport] = useInViewport(collectionRef);
  const [isCollectionLoaded, setIsCollectionLoaded] = React.useState(false);
  const { Sider } = Layout;

  React.useEffect(() => {
    if (isCollectionInViewport && !isCollectionLoaded) {
      setIsCollectionLoaded(true);
    }
  }, [isCollectionInViewport, isCollectionLoaded]);

  return (
    <div className={styles.media}>
      <div className="app-container content-with-aside">
        <div className="media-content">
          <TVDetailsCast id={id} />
          <TVDetailsSeason name={name} id={id} lastSeason={lastSeason} />
          <TVDetailsSocial id={id} />
          <TVDetailsScreens id={id} />
          <div className={styles.observer} ref={collectionRef}></div>
          {isCollectionLoaded && <TVDetailsRecs id={id} />}
        </div>

        <Sider theme="light" className={styles.sider}>
          <SiderMedia
            id={id}
            original_name={original_name}
            original_language={original_language}
            status={status}
            networks={networks}
            type={type}
            homepage={homepage}
          />
        </Sider>
      </div>
    </div>
  );
};

export default TVDetailsMedia;
