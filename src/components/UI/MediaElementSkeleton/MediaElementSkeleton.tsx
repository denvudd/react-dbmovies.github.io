import React from "react";
import ContentLoader from "react-content-loader";
import styles from "./MediaElementSkeleton.module.scss";
interface MediaElementSkeletonProps {
  count: number;
  gutter: number;
}

const MediaElementSkeleton: React.FC<MediaElementSkeletonProps> = ({ count, gutter }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <ContentLoader
      key={index}
      uniqueKey={`${index}`}
      speed={2}
      viewBox="0 0 260 520"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <rect x="0" y="0" rx="5" ry="5" width="260" height="390" />
      <rect x="12" y="402" rx="5" ry="5" width="130" height="15" />
      <rect x="12" y="430" rx="5" ry="5" width="234" height="24" />
      <rect x="12" y="460" rx="5" ry="5" width="234" height="44" />
    </ContentLoader>
  ));

  return (
    <div style={{ gap: gutter }} className={styles.wrapper}>
      {skeletons}
    </div>
  );
};

export default MediaElementSkeleton;
