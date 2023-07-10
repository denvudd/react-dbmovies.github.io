import React from "react";

import Head from "next/head";
import DetailsBanner from "@/components/UI/DetailsBanner/DetailsBanner";
import DetailsTabs from "@/components/UI/DetailsTabs/DetailsTabs";
import { FastAverageColor } from "fast-average-color";
import DetailLayout from "@/layouts/DetailsLayout";
import { createRgbaString } from "@/utils/createRgbaString";

import type { FastAverageColorResult } from "fast-average-color";
import type { GetServerSideProps } from "next/types";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import type { TVDetails, TVVideosApiResponse } from "@/redux/api/tv/types";
import type { Video } from "@/redux/api/types/common";
import TVVideosBlock from "@/components/TVVideosBlock/TVVideosBlock";

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
  runtime: "experimental-edge", // warn: using an experimental edge runtime, the API might change
};

type TVVideosPageApiResponse = TVDetails & {
  videos: TVVideosApiResponse;
};

export interface TVVideosPageProps {
  data: TVVideosTransformedData;
}

interface TVVideosTransformedData {
  name: string;
  videos: Video[];
  first_air_date: string;
  poster_path: string | null;
  overview: string | null;
  id: number;
}

export const getServerSideProps: GetServerSideProps<{
  data: TVVideosTransformedData;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos&language=uk-UA&include_video_language=en&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const response: TVVideosPageApiResponse | ApiError = await res.json();

  if ("status_code" in response && response.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  if ("id" in response && response.id) {
    const {
      name,
      first_air_date,
      id: movieId,
      poster_path,
      videos,
      overview,
    } = response;

    const transformedData: TVVideosTransformedData = {
      name,
      videos: videos.results,
      first_air_date,
      poster_path,
      overview,
      id: movieId,
    };

    return { props: { data: transformedData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/505",
      },
    };
  }
};

const TVPostersPage: React.FC<TVVideosPageProps> = ({ data }) => {
  const { name, videos, first_air_date, poster_path, overview, id } = data;
  const [backdropColor, setBackdropColor] = React.useState<number[] | null>(
    null
  );
  const [isBackdropLight, setIsBackdropLight] = React.useState(false);
  console.log(data);

  React.useEffect(() => {
    // get dominant color by poster
    const fac = new FastAverageColor();
    if (poster_path) {
      fac
        .getColorAsync(
          `https://image.tmdb.org/t/p/w58_and_h87_face/${data.poster_path}`,
          {
            algorithm: "dominant",
            crossOrigin: "anonymous",
          }
        )
        .then((result: FastAverageColorResult) => {
          setIsBackdropLight(result.isLight);
          setBackdropColor(result.value);
        })
        .catch((error) => {
          console.error("Ошибка при получении среднего цвета:", error);
        });
    }
  }, [data.id]);

  const averageColor =
    backdropColor && poster_path
      ? {
          backgroundColor: `${createRgbaString(backdropColor, "1")}`,
        }
      : {
          backgroundColor: `linear-gradient(to right, rgba(31.5, 31.5, 31.5, 1) calc((50vw - 170px) - 340px), rgba(31.5, 31.5, 31.5, 0.84) 50%, rgba(31.5, 31.5, 31.5, 0.84) 100%)`,
        };

  return (
    <>
      <Head>
        <title>
          {data &&
            `${name} (${
              first_air_date?.split("-")[0]
            }) — The Movie Database (TMDB)`}
        </title>
        <meta
          name="description"
          content={data ? (overview as string) : undefined}
        ></meta>
      </Head>
      <DetailsTabs id={id} title={`Поділитися ${name}`} type="tv" />
      <DetailsBanner
        id={id}
        title={name}
        releaseDate={first_air_date}
        posterPath={
          poster_path
            ? `https://image.tmdb.org/t/p/w58_and_h87_face/${poster_path}`
            : "https://placehold.co/58x/png/?text=Not+Found"
        }
        averageColor={averageColor}
        type="tv"
        isBackdropLight={isBackdropLight}
      />
      <div className="app-container content-with-aside panel-details">
        <DetailLayout>
          <TVVideosBlock videos={videos}/>
        </DetailLayout>
      </div>
    </>
  );
};

export default TVPostersPage;
