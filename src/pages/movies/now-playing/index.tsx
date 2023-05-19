import Head from "next/head";
import { Typography } from "antd";
import MovieCard from "@/components/MovieCard/MovieCard";
import { useGetMoviesQuery } from "@/redux/api/movies/slice";
import ListLayout from "@/layouts/ListLayout";
import MovieList from "@/components/UI/MovieList/MovieList";
import SkeletonLoader from "@/components/UI/SkeletonLoader/SkeletonLoader";
import FilterMenu from "@/components/FilterMenu/FilterMenu";

interface MovieCard {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

export const Home = () => {
  const { data: movies, isLoading } = useGetMoviesQuery({
    typeList: "now_playing",
    params: "language=uk-UA&page=1",
  });

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ListLayout>
        {{
          sidebar: <FilterMenu />,
          mainContent: (
            <>
              <Typography.Title className="list-title" level={2}>
                Фільми, що зараз у кіно
              </Typography.Title>
              {isLoading && <SkeletonLoader count={10} gutter={16} />}
              {!isLoading && movies && movies.length !== 0 && (
                <MovieList
                  gutter={16}
                  dataSource={movies}
                  renderItem={(movie: MovieCard, index) => (
                    <MovieCard
                      index={index}
                      id={movie.id}
                      key={movie.id}
                      title={movie.title}
                      imgUrl={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      description={movie.overview}
                      voteAverage={movie.vote_average}
                      release={movie.release_date}
                    />
                  )}
                />
              )}
            </>
          ),
        }}
      </ListLayout>
    </>
  );
};

export default Home;
