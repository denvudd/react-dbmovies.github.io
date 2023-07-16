import React from "react";
import styles from "./PersonCard.module.scss";
import Link from "next/link";
import Image from "next/image";
import type { SearchMovie, SearchTV } from "@/redux/api/search/types";
import { Typography } from "antd";

interface PersonCardProps {
  id: number;
  known_for: SearchMovie[] | SearchTV[];
  name: string;
  profile_path: string;
}

const PersonCard: React.FC<PersonCardProps> = ({
  id,
  known_for,
  name,
  profile_path,
}) => {
  const typeChecker = (element: SearchTV | SearchMovie) => {
    switch (element.media_type) {
      case "movie":
        return `${element.title}`;
      case "tv":
        return `${element.name}`;
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.image}>
          <Link href={`/person/${id}`}>
            <Image
              src={profile_path}
              width={235}
              height={235}
              alt={`${name} profile`}
            />
          </Link>
        </div>
        <div className={styles.meta}>
          <p className={styles.name}>
            <Link href={`/person/${id}`}>{name}</Link>
          </p>
          <Typography.Paragraph ellipsis={{ rows: 1 }} className={styles.sub}>
            <p>
              {known_for.map((element, index, array) => {
                if (index !== array.length - 1) {
                  return `${typeChecker(element)}, `;
                } else {
                  return `${typeChecker(element)}`;
                }
              })}
            </p>
          </Typography.Paragraph>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
