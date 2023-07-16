import React from "react";

import Link from "next/link";
import { Typography } from "antd";
import type { EpisodeGroup } from "@/redux/api/tv/types";
import type { Network } from "@/redux/api/types/common";

import styles from "./EpisodeGroupCard.module.scss";

interface EpisodeGroupCardProps {
  name: string;
  episodeCount: number;
  groupCount: number;
  description: string | null;
  id: string;
  network: Network;
  type: number;
  seriesId: number;
}

const EpisodeGroupCard: React.FC<EpisodeGroupCardProps> = ({
  name,
  episodeCount,
  groupCount,
  description,
  id,
  network,
  type,
  seriesId,
}) => {
  const typeChecker = (type: EpisodeGroup["type"]) => {
    switch (type) {
      case 1:
        return "Оригінальна дата виходу";
      case 2:
        return "Absolute";
      case 3:
        return "DVD";
      case 4:
        return "Цифровий реліз";
      case 5:
        return "Сюжетна лінія";
      case 6:
        return "Виробництво";
      case 7:
        return "ТБ";
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>
        <Link href={`/tv/${seriesId}/episode_groups/${id}`}>
          {name} <span>({typeChecker(type)})</span>
        </Link>
      </h2>
      <h3 className={styles.meta}>
        {groupCount} груп, {episodeCount} серій
      </h3>
      <Typography.Paragraph
        className={styles.description}
        ellipsis={{ rows: 3 }}
      >
        {description
          ? description
          : "(Немає опису українською. Допоможіть — додайте його)"}
      </Typography.Paragraph>
    </div>
  );
};

export default EpisodeGroupCard;
