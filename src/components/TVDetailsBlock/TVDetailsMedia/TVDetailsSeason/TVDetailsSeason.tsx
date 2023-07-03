import React from "react";

import SeasonCard from "@/components/UI/SeasonCard/SeasonCard";
import { Button } from "antd";
import Link from "next/link";
import type { Season } from "@/redux/api/tv/types";

import styles from "./TVDetailsSeason.module.scss";

interface TVDetailsSeasonProps {
  id: number;
  lastSeason: Season;
}

const TVDetailsSeason: React.FC<TVDetailsSeasonProps> = ({
  id,
  lastSeason,
}) => {
  return (
    <section className={styles.season + " panel"}>
      <h3>Останній сезон</h3>
      <div className={styles.container}>
        <SeasonCard seriesId={id} season={lastSeason} outlined />
      </div>
      <Button size="small" type="text" className={styles.seasonButton}>
        <Link href={`/tv/${id}/seasons`} className="bold">
          Переглянути всі сезони
        </Link>
      </Button>
    </section>
  );
};

export default TVDetailsSeason;
