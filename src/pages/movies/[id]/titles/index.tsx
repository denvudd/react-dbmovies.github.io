import React from "react";

import Head from "next/head";
import MovieTitleBlock from "@/components/MovieTitlesBlock/MovieTitleBlock";
import AltTitleSider from "@/components/UI/AltTitlesSider/AltTitleSider";
import DetailsBanner from "@/components/UI/DetailsBanner/DetailsBanner";
import DetailsTabs from "@/components/UI/DetailsTabs/DetailsTabs";
import ListLayout from "@/layouts/ListLayout";
import { FastAverageColor, FastAverageColorResult } from "fast-average-color";
import type {
  MovieAltTitlesApiResponse,
  MovieDetails,
} from "@/redux/api/movies/types";
import type { GetServerSideProps } from "next/types";
import { createRgbaString } from "@/utils/createRgbaString";

/* 
  The long cold start issue fix
  Relative issues: 
  #1 https://github.com/denvudd/react-dbmovies.github.io/issues/2
  #2 https://github.com/vercel/next.js/discussions/50783#discussioncomment-6139352
  #3 https://github.com/vercel/vercel/discussions/7961
  Documentation links:
  #1 https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-with-edge-api-routes
  !! Doesn't work in dev mode !!
*/
export const config = {
  runtime: 'experimental-edge', // warn: using an experimental edge runtime, the API might change
}

interface MovieTitlesPageProps {
  data: MovieDetails & {
    alternative_titles: MovieAltTitlesApiResponse;
  };
}

export const getServerSideProps: GetServerSideProps<{
  data: MovieAltTitlesApiResponse;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?append_to_response=alternative_titles&language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const data: MovieAltTitlesApiResponse = await res.json();
  return { props: { data } };
};

const MovieTitlesPage: React.FC<MovieTitlesPageProps> = ({ data }) => {
  const [backdropColor, setBackdropColor] = React.useState<number[] | null>(
    null
  );
  const [isBackdropLight, setIsBackdropLight] = React.useState(false);

  React.useEffect(() => {
    // get dominant color by poster
    const fac = new FastAverageColor();
    if (data.poster_path) {
      fac
        .getColorAsync(`https://image.tmdb.org/t/p/w58_and_h87_face/${data.poster_path}`, {
          algorithm: "dominant",
          crossOrigin: "anonymous",
        })
        .then((result: FastAverageColorResult) => {
          setIsBackdropLight(result.isLight);
          setBackdropColor(result.value);
        })
        .catch((error) => {
          console.error("Ошибка при получении среднего цвета:", error);
        });
    }
  }, [data.id]);

  const averageColor = backdropColor && data.poster_path && !isBackdropLight
  ? {
      backgroundColor: `${createRgbaString(backdropColor, "1")}`,
    }
  : {
      backgroundColor: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)`,
    }

  return (
    <>
      <Head>
      <title>
          {data
            ? `${data.title} (${data.release_date?.split("-")[0]}) - Альтернативні назви`
            : "Не знайдено"}{" "}
          — The Movie Database (TMDB)
        </title>
        <meta name="description" content={data ? data.overview as string : undefined}></meta>
      </Head>
      <DetailsTabs id={data.id} />
      <DetailsBanner
        title={data.title}
        releaseDate={data.release_date}
        posterPath={
          data.poster_path
            ? `https://image.tmdb.org/t/p/w58_and_h87_face/${data.poster_path}`
            : "https://placehold.co/58x/png/?text=Not+Found"
        }
        averageColor={averageColor}
      />
      <div className="app-container content-with-aside panel-details">
        <ListLayout siderTheme="light">
          {{
            sidebar: (
              <AltTitleSider
                totalCount={data.alternative_titles.titles.length}
                countries={data.alternative_titles.titles}
                averageColor={averageColor}
              />
            ),
            mainContent: <MovieTitleBlock data={data} />,
          }}
        </ListLayout>
      </div>
    </>
  );
};

export default MovieTitlesPage;
