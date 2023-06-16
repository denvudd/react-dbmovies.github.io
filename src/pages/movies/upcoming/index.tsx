import React from "react";
import { useLazyGetMoviesQuery } from "@/redux/api/movies/slice";
import { useLazyGetMovieDiscoverQuery } from "@/redux/api/discover/slice";
import { useSelector } from "react-redux";

import Head from "next/head";
import { Pagination, Typography } from "antd";
import MovieCard from "@/components/UI/MovieCard/MovieCard";
import MovieList from "@/components/UI/MovieList/MovieList";
import SkeletonLoader from "@/components/UI/SkeletonLoader/SkeletonLoader";
import FilterMenu from "@/components/FilterMenu/FilterMenu";
import ListLayout from "@/layouts/ListLayout";
import { selectParams } from "@/redux/params/selectors";
import { isSortParamsEmpty } from "@/utils/isSortParamsEmpty";
import { ListMoviesApiResponse } from "@/redux/api/movies/types/ListMovieType";
interface MovieCard {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  release_date: string;
}

export const Home = () => {
  const params = useSelector(selectParams);
  const [currentPageDefault, setCurrentPageDefault] = React.useState(1);
  const [currentPageSort, setCurrentPageSort] = React.useState(1);
  const [getDefaultMovies, { isLoading: isDefaultMoviesLoading }] =
    useLazyGetMoviesQuery();
  const [getSortMovies, { isLoading: isSortMoviesLoading }] =
    useLazyGetMovieDiscoverQuery();
  const [data, setData] = React.useState<ListMoviesApiResponse | undefined>(
    undefined
  );

  // getDefaultMovies
  const handlePageChangeDefault = (page: number) => {
    setCurrentPageDefault(page);
  };

  // getSortMovies
  const handlePageChangeSort = (page: number) => {
    setCurrentPageSort(page);
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);
    const { sortBy } = params.sortData;
    const {
      language,
      releaseDates,
      voteAverage,
      voteCount,
      runtime,
      genres,
      keywords,
    } = params.additionalSortData;

    const queryParameters = {
      language: language ? `&with_original_language=${language}` : "",
      releaseDateGte: releaseDates?.date_gte
        ? `&release_date.gte=${releaseDates.date_gte}`
        : "",
      releaseDateLte: releaseDates?.date_lte
        ? `&release_date.lte=${releaseDates.date_lte}`
        : "",
      voteAverageGte: voteAverage?.voteAverage_gte
        ? `&vote_average.gte=${voteAverage.voteAverage_gte}`
        : "",
      voteAverageLte: voteAverage?.voteAverage_lte
        ? `&vote_average.lte=${voteAverage.voteAverage_lte}`
        : "",
      voteCountGte: voteCount?.voteCount_gte
        ? `&vote_count.gte=${voteCount.voteCount_gte}`
        : "",
      voteCountLte: voteCount?.voteCount_lte
        ? `&vote_count.lte=${voteCount.voteCount_lte}`
        : "",
      runtimeGte: runtime?.runtime_gte
        ? `&with_runtime.gte=${runtime.runtime_gte}`
        : "",
      runtimeLte: runtime?.runtime_lte
        ? `&with_runtime.lte=${runtime.runtime_lte}`
        : "",
      genres:
        genres && genres.length !== 0 ? `&with_genres=${genres.join(",")}` : "",
      keywords:
        keywords && keywords.length !== 0
          ? `&with_keywords=${keywords.join(",")}`
          : "",
    };

    const queryString = Object.values(queryParameters).join("");

    if (isSortParamsEmpty(params)) {
      getDefaultMovies(
        {
          typeList: "upcoming",
          params: `language=uk-UA&page=${currentPageDefault}`,
        },
        true
      )
        .unwrap()
        .then((data) => {
          if (data && data.results.length > 0) {
            setData(data);
            setCurrentPageDefault(data.page);
          }
        });
    } else {
      getSortMovies(
        `language=uk-UA&page=${currentPageSort}&sort_by=${
          sortBy === "" ? "popularity.desc" : sortBy
        }${queryString}`,
        true
      )
        .unwrap()
        .then((data) => {
          if (data && data.results.length > 0) {
            setData(data);
            setCurrentPageSort(data.page);
          }
        });
    }
  }, [params, currentPageDefault, currentPageSort]);

  return (
    <>
      <Head>
        <title>Очікувані фільми — The Movie Database (TMDB)</title>
      </Head>
      <ListLayout>
        {{
          sidebar: <FilterMenu />,
          mainContent: (
            <>
              <Typography.Title className="list-title" level={2}>
                Очікувані фільми
              </Typography.Title>
              {(isDefaultMoviesLoading || isSortMoviesLoading) && !data && (
                <SkeletonLoader count={10} gutter={16} />
              )}
              {!isDefaultMoviesLoading &&
                !isSortMoviesLoading &&
                data &&
                data.results.length !== 0 && (
                  <>
                    <MovieList
                      gutter={16}
                      dataSource={data.results}
                      renderItem={(movie: MovieCard, index: number) => (
                        <MovieCard
                          id={movie.id}
                          index={index}
                          key={movie.id}
                          title={movie.title}
                          imgUrl={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                              : `https://placehold.co/260x390/png/?text=No+Image`
                          }
                          description={movie.overview}
                          voteAverage={movie.vote_average}
                          release={movie.release_date}
                        />
                      )}
                    />
                    <div className="pagination-wrapper">
                      <Pagination
                        defaultCurrent={1}
                        current={data.page}
                        pageSize={20}
                        onChange={
                          isSortParamsEmpty(params)
                            ? handlePageChangeDefault
                            : handlePageChangeSort
                        }
                        total={data.total_results}
                        showSizeChanger={false}
                        className="pagination"
                      />
                      <span className="pagination-total">
                        Всього фільмів знайдено: {data.total_results}
                      </span>
                    </div>
                  </>
                )}
            </>
          ),
        }}
      </ListLayout>
    </>
  );
};

export default Home;
