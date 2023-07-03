import React from "react";
import { useGetTVCreditsCastQuery } from "@/redux/api/tv/slice";

import CastCard from "@/components/UI/CastCard/CastCard";
import { List, Button } from "antd";
import Link from "next/link";

import styles from "./TVDetailsCast.module.scss";

interface TVDetailsCastProps {
  id: number;
}

const TVDetailsCast: React.FC<TVDetailsCastProps> = ({ id }) => {
  const { data: cast, isLoading } = useGetTVCreditsCastQuery({
    id,
    params: "language=uk-UA&page=1",
  });

  return (
    <section className={styles.cast + " panel"}>
      <h3>В головних ролях</h3>
      <div className={"scroller-wrapper scroller-with-overflow"}>
        <List
          itemLayout="horizontal"
          className={"scroller"}
          dataSource={cast?.cast.slice(0, 9)}
          grid={{
            gutter: 5,
          }}
          loading={isLoading}
          renderItem={(cast) => (
            <List.Item key={cast.id}>
              <CastCard
                id={cast.id}
                name={cast.name}
                character={cast.character}
                mediaType="movie"
                imgUrl={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w138_and_h175_face${cast.profile_path}`
                    : "https://placehold.co/138x175/png/?text=Not+Found"
                }
              />
            </List.Item>
          )}
        ></List>
      </div>
      <Button size="small" type="text" className={styles.castButton}>
        <Link href={`/tv/${id}/cast`} className="bold">
          Уся знімальна група й акторський склад
        </Link>
      </Button>
    </section>
  );
};

export default TVDetailsCast;
