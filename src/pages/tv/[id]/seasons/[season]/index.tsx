import React from "react";

import Head from "next/head";
import DetailsBanner from "@/components/UI/DetailsBanner/DetailsBanner";
import DetailsTabs from "@/components/UI/DetailsTabs/DetailsTabs";
import DetailLayout from "@/layouts/DetailsLayout";
import TVSeasonDetailsBlock from "@/components/TVSeasonDetailsBlock/TVSeasonDetailsBlock";
import { FastAverageColor } from "fast-average-color";
import { createRgbaString } from "@/utils/createRgbaString";

import type { GetServerSideProps } from "next/types";
import type { FastAverageColorResult } from "fast-average-color";
import type {
  TVDetailsApiResponse,
  TVSeasonDetailsApiResponse,
  Episode,
} from "@/redux/api/tv/types";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import Link from "next/link";

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

interface TVSeasonDetailsTransformedApiResponse {
  tvDetails: TVDetailsApiResponse;
  seasonDetailsData: TVSeasonDetailsApiResponse;
}

interface TVSeasonDetailsPageProps {
  data: TVSeasonDetailsTratsformedData;
}

interface TVSeasonDetailsTratsformedData {
  name: string;
  seasonName: string;
  overview: string | null;
  seasonOverview: string | null;
  first_air_date: string;
  poster_path: string | null;
  seasonPoster: string | null;
  tvId: number;
  seasonId: string;
  air_date: string;
  episodes: Episode[];
  season_number: number;
}

export const getServerSideProps: GetServerSideProps<{
  data: TVSeasonDetailsTratsformedData;
}> = async (context) => {
  const { id, season } = context.query;
  const tvDetailsRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const seasonDetailsRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );

  const [tvDetails, seasonDetails] = await Promise.all([
    tvDetailsRes,
    seasonDetailsRes,
  ]);

  const tvDetailsData = await tvDetails.json();
  const seasonDetailsData = await seasonDetails.json();

  const mergedData: TVSeasonDetailsTransformedApiResponse = {
    tvDetails: tvDetailsData,
    seasonDetailsData: seasonDetailsData,
  };

  const response: TVSeasonDetailsTransformedApiResponse | ApiError = mergedData;

  if ("status_code" in response && response.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  if ("id" in response.tvDetails && response.seasonDetailsData) {
    const {
      first_air_date,
      id: tvId,
      poster_path,
      overview,
      name,
    } = response.tvDetails;

    const {
      air_date,
      episodes,
      name: seasonName,
      overview: seasonOverview,
      poster_path: seasonPoster,
      season_number,
      _id: seasonId,
    } = response.seasonDetailsData;

    const transformedData: TVSeasonDetailsTratsformedData = {
      name,
      seasonName,
      overview,
      seasonOverview,
      poster_path,
      seasonPoster,
      season_number,
      seasonId,
      episodes,
      air_date,
      tvId,
      first_air_date,
    };
    return { props: { data: transformedData } };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/500",
      },
    };
  }
};

const TVSeasonsPage: React.FC<TVSeasonDetailsPageProps> = ({ data }) => {
  const {
    name,
    seasonName,
    overview,
    seasonOverview,
    poster_path,
    seasonPoster,
    season_number,
    seasonId,
    episodes,
    air_date,
    tvId,
    first_air_date,
  } = data;
  const [backdropColor, setBackdropColor] = React.useState<number[] | null>(
    null
  );
  const [isBackdropLight, setIsBackdropLight] = React.useState(false);

  React.useEffect(() => {
    // get dominant color by poster
    const fac = new FastAverageColor();
    if (poster_path) {
      fac
        .getColorAsync(
          `https://image.tmdb.org/t/p/w58_and_h87_face/${poster_path}`,
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
  }, [data.tvId]);

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
            }) — ${seasonName} — The Movie Database (TMDB)`}
        </title>
        <meta
          name="description"
          content={data ? (overview as string) : undefined}
        ></meta>
      </Head>
      <DetailsTabs id={tvId} title={`Поділитися ${name}`} type="tv" />
      <DetailsBanner
        id={tvId}
        title={`${seasonName}`}
        releaseDate={air_date}
        posterPath={
          seasonPoster
            ? `https://image.tmdb.org/t/p/w58_and_h87_face/${seasonPoster}`
            : "https://placehold.co/58x/png/?text=Not+Found"
        }
        averageColor={averageColor}
        type="tv"
        isBackdropLight={isBackdropLight}
        customLink={<Link className="details-back-navigation" href={`/tv/${tvId}/seasons`}>← Повернутися до сезонів</Link>}
        
      />
      <div className="app-container content-with-aside panel-details">
        <DetailLayout>
          <TVSeasonDetailsBlock episodes={episodes} tvId={tvId} />
        </DetailLayout>
      </div>
    </>
  );
};

export default TVSeasonsPage;
