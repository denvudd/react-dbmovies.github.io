import React from "react";
import {
  useLazyGetMovieImagesQuery,
  useLazyGetMovieVideosQuery,
} from "@/redux/api/movies/slice";

import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { TabsProps, Tabs, Skeleton } from "antd";
import VideoCard from "@/components/UI/cards/VideoCard/VideoCard";
import { generateShimmer } from "@/utils/generateShimmer";

import styles from "./MovieDetailsScreens.module.scss";
interface MovieDetailsScreensProps {
  id: number;
}

enum TabValues {
  POSTERS = "posters",
  BACKDROPS = "backdrops",
  VIDEOS = "videos",
}

const MovieDetailsScreens: React.FC<MovieDetailsScreensProps> = ({ id }) => {
  const [
    getImages,
    { data: images, isLoading: isImagesLoading, isError: isImagesError },
  ] = useLazyGetMovieImagesQuery();
  const [
    getVideos,
    { data: videos, isLoading: isVideosLoading, isError: isVideosError },
  ] = useLazyGetMovieVideosQuery();
  const [tabKey, setTabKey] = React.useState<TabValues | string>(
    TabValues.VIDEOS
  );

  const handleTabChange = (key: string) => {
    setTabKey(key);
    switch (tabKey) {
      case TabValues.POSTERS:
        getImages({ id }, true);
        break;
      case TabValues.BACKDROPS:
        getImages({ id }, true);
        break;
      case TabValues.VIDEOS:
        getVideos({ id, params: "language=uk-UA" }, true);
        break;
      default:
        () => null;
    }
  };

  React.useEffect(() => {
    handleTabChange(tabKey);
  }, [id, tabKey]);

  const tabs: TabsProps["items"] = [
    {
      key: TabValues.VIDEOS,
      label: `Відеоролики`,
      children: (
        <div>
          {
            <div>
              {isVideosLoading && (
                <div className="scroller-wrapper">
                  <div className={styles.skeletonWrapper + " scroller"}>
                    {[...new Array(6)].map((_, i) => (
                      <Skeleton.Image
                        key={i}
                        style={{ width: "533px", height: "300px" }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {!isVideosLoading && videos && videos.length !== 0 && (
                <div className="scroller-wrapper">
                  <div className={styles.list + " scroller"}>
                    {videos.map((video) => (
                      <VideoCard key={video.key} videoKey={video.key} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          }
          {!isVideosLoading && videos && videos.length === 0 && (
            <p className="empty-text--default">
              Нам не вдалося знайти медіа по цьому запиту 😕
            </p>
          )}
          {!isVideosLoading && isVideosError && (
            <p className="empty-text--default">Сталась помилка 😕</p>
          )}
        </div>
      ),
    },
    {
      key: TabValues.BACKDROPS,
      label: `Світлини`,
      children: (
        <div>
          {
            <div>
              {isImagesLoading && (
                <div className="scroller-wrapper">
                  <div className={styles.skeletonWrapper + " scroller"}>
                    {[...new Array(6)].map((_, i) => (
                      <Skeleton.Image
                        key={i}
                        style={{ width: "533px", height: "300px" }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {!isImagesLoading && images && images.backdrops.length !== 0 && (
                <div className="scroller-wrapper">
                  <div className={styles.list + " scroller"}>
                    {images.backdrops.slice(0, 6).map((image) => (
                      <div key={image.file_path} className={styles.item}>
                        <Image
                          width={533}
                          height={300}
                          src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2/${image.file_path}`}
                          alt="Backdrop"
                          className={styles.backdrop}
                          placeholder="blur"
                          blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                            533,
                            300,
                            80,
                            60
                          )}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          }
          {!isImagesLoading && images && images.backdrops.length === 0 && (
            <p className="empty-text--default">
              Нам не вдалося знайти медіа по цьому запиту 😕
            </p>
          )}
          {!isImagesLoading && isImagesError && (
            <p className="empty-text--default">Сталась помилка 😕</p>
          )}
        </div>
      ),
    },
    {
      key: TabValues.POSTERS,
      label: `Постери`,
      children: (
        <div>
          <div>
            {isImagesLoading && (
              <div className="scroller-wrapper">
                <div className={styles.skeletonWrapper + " scroller"}>
                  {[...new Array(6)].map((_, i) => (
                    <Skeleton.Image
                      key={i}
                      style={{ width: "533px", height: "300px" }}
                    />
                  ))}
                </div>
              </div>
            )}
            {!isImagesLoading && images && images.posters.length !== 0 && (
              <div className="scroller-wrapper">
                <div className={styles.list + " scroller"}>
                  {images.posters.slice(0, 6).map((image) => (
                    <div key={uuidv4()} className={styles.item}>
                      <Image
                        width={220}
                        height={330}
                        src={`https://image.tmdb.org/t/p/w220_and_h330_face/${image.file_path}`}
                        alt="Backdrop"
                        placeholder="blur"
                        className={styles.poster}
                        blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                          220,
                          330,
                          80,
                          60
                        )}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {!isImagesLoading && images && images.posters.length === 0 && (
            <p className="empty-text--default">
              Нам не вдалося знайти медіа по цьому запиту 😕
            </p>
          )}
          {!isImagesLoading && isImagesError && (
            <p className="empty-text--default">Сталась помилка 😕</p>
          )}
        </div>
      ),
    },
  ];

  return (
    <section className={styles.mediaPanel + " panel"}>
      <Tabs
        tabBarExtraContent={{ left: <h3>Медіа</h3> }}
        onChange={handleTabChange}
        activeKey={tabKey}
        tabBarStyle={{ fontWeight: "700", fontSize: "1.1em" }}
        items={tabs}
      ></Tabs>
    </section>
  );
};

export default MovieDetailsScreens;
