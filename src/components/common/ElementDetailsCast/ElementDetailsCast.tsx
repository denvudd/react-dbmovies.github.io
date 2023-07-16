import React from "react";

import { List, Button } from "antd";
import Link from "next/link";
import CastCard from "@/components/UI/cards/CastCard/CastCard";
import type { CastMember } from "@/redux/api/types/common";
import type { AggregateCastMember } from "@/redux/api/tv/types";

import styles from "./ElementDetailsCast.module.scss";

interface ElementDetailsCastProps {
  id: number;
  cast: (CastMember | AggregateCastMember)[] | undefined;
  isLoading: boolean;
  type?: "movie" | "tv";
}

const ElementDetailsCast: React.FC<ElementDetailsCastProps> = ({
  id,
  cast,
  isLoading,
  type = "movie",
}) => {
  const renderCastItem = (item: CastMember | AggregateCastMember) => {
    if ("roles" in item) {
      // AggregateCastMember
      return (
        <CastCard
          id={item.id}
          name={item.name}
          character={item.roles}
          mediaType="tv"
          imgUrl={
            item.profile_path
              ? `https://image.tmdb.org/t/p/w138_and_h175_face${item.profile_path}`
              : "https://placehold.co/138x175/png/?text=Not+Found"
          }
        />
      );
    } else {
      // CastMember
      return (
        <CastCard
          id={item.id}
          name={item.name}
          character={item.character}
          mediaType="movie"
          imgUrl={
            item.profile_path
              ? `https://image.tmdb.org/t/p/w138_and_h175_face${item.profile_path}`
              : "https://placehold.co/138x175/png/?text=Not+Found"
          }
        />
      );
    }
  };

  return (
    <section className={styles.cast + " panel"}>
      <h3>В головних ролях</h3>
      <div className={"scroller-wrapper scroller-with-overflow"}>
        <List
          itemLayout="horizontal"
          className={"scroller"}
          dataSource={cast?.slice(0, 9)}
          locale={{
            emptyText: (
              <span className="empty-text--default">
                Ми не знайшли інформації для цього запиту.
              </span>
            ),
          }}
          grid={{
            gutter: 5,
          }}
          loading={isLoading}
          renderItem={(item) => (
            <List.Item key={item.id}>{renderCastItem(item)}</List.Item>
          )}
        ></List>
      </div>
      <Button size="small" type="text" className={styles.castButton}>
        <Link href={`/${type === "movie" ? "movies" : "tv"}/${id}/cast`} className="bold">
          Уся знімальна група й акторський склад
        </Link>
      </Button>
    </section>
  );
};

export default ElementDetailsCast;
