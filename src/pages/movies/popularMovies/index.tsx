import Head from "next/head";
import { Typography } from "antd";
import MovieCard from "@/components/MovieCard/MovieCard";
import { useGetMoviesQuery } from "@/redux/api/movies/slice";
import { useLazyGetMovieDiscoverQuery } from "@/redux/api/discover/slice";
import ListLayout from "@/layouts/ListLayout";
import MovieList from "@/components/UI/MovieList/MovieList";
import SkeletonLoader from "@/components/UI/SkeletonLoader/SkeletonLoader";
import FilterMenu from "@/components/FilterMenu/FilterMenu";
import { useSelector } from "react-redux";
import React from "react";
import { selectParams } from "@/redux/params/selectors";
import { isSortParamsEmpty } from "@/utils/isSortParamsEmpty";

interface MovieCard {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

export const Home = () => {
  const queryParams = useSelector(selectParams);
  const { data: moviesDefault } = useGetMoviesQuery({
    typeList: "popular",
    params: "language=uk-UA&page=1",
  });
  const [getSortMovies, { data: sortMovies }] = useLazyGetMovieDiscoverQuery();
  const [data, setData] = React.useState<MovieCard[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const isAllParamsEmpty = isSortParamsEmpty(queryParams);

    // console.log(isAllParamsEmpty);

    if (isAllParamsEmpty) {
      if (moviesDefault && moviesDefault.length > 0) {
        setData(moviesDefault);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      getSortMovies(
        `language=uk-UA&page=1&sort_by=${queryParams.sortData.sortBy}`
      )
        .unwrap()
        .then((result) => {
          if (result && result.length > 0) {
            setData(result);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [queryParams, moviesDefault]);

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
                Популярні фільми
              </Typography.Title>
              {isLoading && <SkeletonLoader count={10} gutter={16} />}
              {!isLoading &&
                ((moviesDefault && moviesDefault.length !== 0) ||
                  (sortMovies && sortMovies.length !== 0)) && (
                  <MovieList
                    gutter={16}
                    dataSource={data}
                    renderItem={(movie: MovieCard, index: number) => (
                      <MovieCard
                        id={movie.id}
                        index={index}
                        key={movie.id}
                        title={movie.title}
                        imgUrl={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : `https://placehold.co/260x390/png/?text=No+Image`
                        }
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