import React from "react";
import { useGetMovieCreditsCastQuery } from "@/redux/api/movies/slice";

import CastCard from "@/components/UI/CastCard/CastCard";
import { List, Button } from "antd";

import styles from "./MovieDetailsCast.module.scss";
import Link from "next/link";
interface MovieDetailsCastProps {
  id: number;
}

const MovieDetailsCast: React.FC<MovieDetailsCastProps> = ({ id }) => {
  const { data: cast, isLoading } = useGetMovieCreditsCastQuery({
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
        <Link href={`/movies/${id}/cast`} className="bold">
          Уся знімальна група й акторський склад
        </Link>
      </Button>
    </section>
  );
};

export default MovieDetailsCast;
