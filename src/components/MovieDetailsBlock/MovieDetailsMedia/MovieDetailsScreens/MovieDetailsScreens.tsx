import React from "react";
import {
  useLazyGetMovieImagesQuery,
  useLazyGetMovieVideosQuery,
} from "@/redux/api/movies/slice";

import Image from "next/image";
import { TabsProps, Tabs, Skeleton, List } from "antd";
import VideoCard from "@/components/UI/VideoCard/VideoCard";
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
  const [getImages, { data: images, isLoading: isImagesLoading }] =
    useLazyGetMovieImagesQuery();
  const [getVideos, { data: videos, isLoading: isVideosLoading }] =
    useLazyGetMovieVideosQuery();
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
          {isImagesLoading && (
            <>
              {[...new Array(6)].map((_, i) => (
                <Skeleton.Image
                  key={i}
                  style={{ width: "533px", height: "300px" }}
                />
              ))}
            </>
          )}
          {
            <div className="scroller-wrapper">
              <List
                itemLayout="horizontal"
                className={"scroller"}
                dataSource={videos?.slice(0, 3)}
                grid={{
                  gutter: 0,
                }}
                locale={{
                  emptyText: (
                    <p className="empty-text--default">
                      Нам не вдалося знайти медіа по цьому запиту 😕
                    </p>
                  ),
                }}
                renderItem={(video) => (
                  <List.Item key={video.id}>
                    <VideoCard videoKey={video.key} />
                  </List.Item>
                )}
              ></List>
            </div>
          }
        </div>
      ),
    },
    {
      key: TabValues.POSTERS,
      label: `Світлини`,
      children: (
        <div>
          {isImagesLoading && (
            <>
              {[...new Array(6)].map((_, i) => (
                <Skeleton.Image
                  key={i}
                  style={{ width: "533px", height: "300px" }}
                />
              ))}
            </>
          )}
          {
            <div className="scroller-wrapper">
              <List
                itemLayout="horizontal"
                className={"scroller"}
                dataSource={images?.backdrops?.slice(0, 6)}
                grid={{
                  gutter: 0,
                }}
                locale={{
                  emptyText: (
                    <p className="empty-text--default">
                      Нам не вдалося знайти медіа по цьому запиту 😕
                    </p>
                  ),
                }}
                renderItem={(image) => (
                  <List.Item key={image.file_path.substring(0, 1)}>
                    <Image
                      width={533}
                      height={300}
                      src={`https://image.tmdb.org/t/p/w533_and_h300_bestv2/${image.file_path}`}
                      alt="Backdrop"
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                        138,
                        175,
                        80,
                        60
                      )}`}
                    ></Image>
                  </List.Item>
                )}
              ></List>
            </div>
          }
        </div>
      ),
    },
    {
      key: TabValues.BACKDROPS,
      label: `Постери`,
      children: (
        <div>
          {isImagesLoading && (
            <>
              {[...new Array(6)].map((_, i) => (
                <Skeleton.Image
                  key={i}
                  style={{ width: "200px", height: "330px" }}
                />
              ))}
            </>
          )}
          {
            <List
              itemLayout="horizontal"
              className={"scroller"}
              dataSource={images?.posters?.slice(0, 6)}
              grid={{
                gutter: 0,
              }}
              locale={{
                emptyText: (
                  <p className="empty-text--default">
                    Нам не вдалося знайти медіа по цьому запиту 😕
                  </p>
                ),
              }}
              renderItem={(image) => (
                <List.Item key={image.file_path.substring(0, 1)}>
                  <Image
                    width={220}
                    height={330}
                    src={`https://image.tmdb.org/t/p/w220_and_h330_face/${image.file_path}`}
                    alt="Backdrop"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${generateShimmer(
                      138,
                      175,
                      80,
                      60
                    )}`}
                  ></Image>
                </List.Item>
              )}
            ></List>
          }
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
