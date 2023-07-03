import React from "react";
import { useLazyGetTVDiscoverQuery } from "@/redux/api/discover/slice";
import { useLazyGetTVQuery } from "@/redux/api/tv/slice";
import { useSelector } from "react-redux";

import { selectParams } from "@/redux/params/selectors";
import Head from "next/head";
import { Pagination } from "antd";
import MediaElementCard from "@/components/UI/MediaElementCard/MediaElementCard";
import MovieList from "@/components/UI/MovieList/MovieList";
import SkeletonLoader from "@/components/UI/SkeletonLoader/SkeletonLoader";
import FilterMenu from "@/components/FilterMenu/FilterMenu";
import ListLayout from "@/layouts/ListLayout";
import { isSortParamsEmpty } from "@/utils/isSortParamsEmpty";
import { TVListApiResponse } from "@/redux/api/tv/types";

interface TVCard {
  id: number;
  name: string;
  poster_path: string | null;
  overview: string;
  vote_average: number;
  first_air_date: string;
}

export const OnTheAirTVPage = () => {
  const params = useSelector(selectParams);
  const [currentPageDefault, setCurrentPageDefault] = React.useState(1);
  const [currentPageSort, setCurrentPageSort] = React.useState(1);
  const [getDefaultTV, { isFetching: isDefaultMoviesFetching }] =
    useLazyGetTVQuery();
  const [getSortTV, { isFetching: isSortMoviesFetching }] =
    useLazyGetTVDiscoverQuery();
  const [data, setData] = React.useState<TVListApiResponse | undefined>(
    undefined
  );

  // getDefaultTV
  const handlePageChangeDefault = (page: number) => {
    setCurrentPageDefault(page);
  };

  // getSortTV
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
        ? `&first_air_date.gte=${releaseDates.date_gte}`
        : "",
      releaseDateLte: releaseDates?.date_lte
        ? `&first_air_date.lte=${releaseDates.date_lte}`
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
      getDefaultTV(
        {
          typeList: "on_the_air",
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
      getSortTV(
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
        <title>Серіали, що виходять зараз — The Movie Database (TMDB)</title>
      </Head>
      <ListLayout>
        {{
          sidebar: <FilterMenu mediaType="tv"/>,
          mainContent: (
            <div className="panel-details">
              <h1 className="list-title">Серіали, що виходять зараз</h1>
              {(isDefaultMoviesFetching || isSortMoviesFetching) && (
                <SkeletonLoader count={10} gutter={16} />
              )}
              {!isDefaultMoviesFetching &&
                !isSortMoviesFetching &&
                data &&
                data.results.length !== 0 && (
                  <>
                    <MovieList
                      gutter={16}
                      dataSource={data.results}
                      renderItem={(movie: TVCard, index: number) => (
                        <MediaElementCard
                          id={movie.id}
                          index={index}
                          key={movie.id}
                          title={movie.name}
                          imgUrl={
                            movie.poster_path
                              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
                              : `https://placehold.co/260x390/png/?text=No+Image`
                          }
                          description={movie.overview}
                          voteAverage={movie.vote_average}
                          release={movie.first_air_date}
                          type="tv"
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
                        Всього серіалів знайдено: {data.total_results}
                      </span>
                    </div>
                  </>
                )}
            </div>
          ),
        }}
      </ListLayout>
    </>
  );
};

export default OnTheAirTVPage;
