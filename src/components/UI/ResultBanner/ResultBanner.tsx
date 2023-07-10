import React from "react";
import type { ReactNode } from "react";
import styles from "./ResultBanner.module.scss";

interface ResultBannerProps {
  title: string | ReactNode;
  total: string | ReactNode;
  extraBar?: ReactNode | undefined;
}

const ResultBanner: React.FC<ResultBannerProps> = ({
  title,
  total,
  extraBar = undefined,
}) => {
  return (
    <div className={styles.block}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <div className={styles.text}>
            <div className={styles.about}>
              {typeof title === "string" ? <h2>{title}</h2> : title}
            </div>
            <div className={styles.total}>
              <h2>{total}</h2>
            </div>
          </div>
          {extraBar && extraBar}
        </div>
      </div>
      
    </div>
  );
};

export default ResultBanner;
