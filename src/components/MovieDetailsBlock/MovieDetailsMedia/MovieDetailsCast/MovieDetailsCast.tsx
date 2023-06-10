import React from "react";
import CastCard from "@/components/UI/CastCard/CastCard";
import { Typography, List, Button } from "antd";
import { useGetMovieCreditsCastQuery } from "@/redux/api/movies/slice";
import styles from "./MovieDetailsCast.module.scss";

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
      <Typography.Title level={4}>В головних ролях</Typography.Title>
      <div className={"scroller-wrapper scroller-with-overflow"}>
        <List
          itemLayout="horizontal"
          className={"scroller"}
          dataSource={cast?.slice(0, 9)}
          grid={{
            gutter: 5,
          }}
          renderItem={(cast) => (
            <List.Item key={cast.id}>
              <CastCard
                id={cast.id}
                name={cast.name}
                character={cast.character}
                profile_path={
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
        <Typography.Link className="bold">
          Уся знімальна група й акторський склад
        </Typography.Link>
      </Button>
    </section>
  );
};

export default MovieDetailsCast;
