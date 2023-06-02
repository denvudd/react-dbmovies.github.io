import React from "react";
import styles from "./OptionElement.module.scss";
import Image from "next/image";

interface OptionElementProps {
  index: number;
  title: string;
  release_date: string;
  poster_path: string;
}

const OptionElement: React.FC<OptionElementProps> = ({
  index,
  title,
  release_date,
  poster_path,
}) => {
  return (
    <div className={styles.option}>
      <div className={styles.wrapper}>
        <div className={styles.poster}>
          <Image
            width={45}
            height={67}
            src={poster_path}
            alt={title}
            priority={index < 5}
          />
        </div>
        <div className={styles.details}>
          <p className={styles.title}>{title}</p>
          <p className={styles.release}>{release_date}</p>
        </div>
      </div>
    </div>
  );
};

export default OptionElement;
