import React from "react";
import ContentLoader from "react-content-loader";
import styles from './SkeletonLoader.module.scss';
interface SkeletonLoaderProps {
  count: number;
  gutter: number
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count, gutter }) => {
  const skeletons = Array.from({ length: count }, (_, index) => (
    <ContentLoader
      key={index}
      uniqueKey={`${index}`}
      speed={2}
      viewBox="0 0 260 557"
      backgroundColor="#e0e0e0"
      foregroundColor="#d1d1d1"
    >
      <rect x="0" y="0" rx="0" ry="0" width="260" height="396" />
      <rect x="20" y="418" rx="0" ry="0" width="119" height="18" />
      <rect x="20" y="448" rx="0" ry="0" width="210" height="18" />
      <rect x="20" y="479" rx="0" ry="0" width="210" height="44" />
    </ContentLoader>
  ));

  return <div style={{ gap: gutter }} className={styles.wrapper}>{skeletons}</div>;
};

export default SkeletonLoader;
