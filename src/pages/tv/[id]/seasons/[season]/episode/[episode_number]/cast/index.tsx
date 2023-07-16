import React from "react";

import Head from "next/head";
import DetailsBanner from "@/components/UI/banners/DetailsBanner/DetailsBanner";
import DetailsTabs from "@/components/UI/tabs/DetailsTabs/DetailsTabs";
import TVEpisodeCastBlock from "@/components/blocks/tv/TVEpisodeCastBlock/TVEpisodeCastBlock";
import { FastAverageColor } from "fast-average-color";
import { createRgbaString } from "@/utils/createRgbaString";
import DetailLayout from "@/layouts/DetailsLayout";
import Link from "next/link";

import type { GetServerSideProps } from "next/types";
import type { FastAverageColorResult } from "fast-average-color";
import type {
  GuestStar,
  TVDetailsApiResponse,
  TVEpisodeCastApiResponse,
  TVEpisodeDetailsApiResponse,
} from "@/redux/api/tv/types";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import type { CastMember, CrewMember } from "@/redux/api/types/common";

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

type TVEpisodeСastAppendToResponse = TVEpisodeDetailsApiResponse & {
  credits: TVEpisodeCastApiResponse;
};

interface TVEpisodeCastTransformedApiResponse {
  tvDetails: TVDetailsApiResponse;
  episodeCastData: TVEpisodeСastAppendToResponse;
}

interface TVEpisodeCastPageProps {
  data: TVEpisodeCastTransformedData;
}

interface TVEpisodeCastTransformedData {
  name: string;
  first_air_date: string;
  episodeName: string;
  overview: string | null;
  poster_path: string | null;
  episodePoster: string | null;
  tvId: number;
  air_date: string;
  season_number: number;
  episode_number: number;
  crew: CrewMember[];
  cast: CastMember[];
  guest_stars: GuestStar[];
}

export const getServerSideProps: GetServerSideProps<{
  data: TVEpisodeCastTransformedData;
}> = async (context) => {
  const { id, season, episode_number } = context.query;
  const tvDetailsRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}?language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const episodeDetailsRes = await fetch(
    `https://api.themoviedb.org/3/tv/${id}/season/${season}/episode/${episode_number}?append_to_response=credits&include_images_language=en-US&language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );

  const [tvDetails, episodeVideoDetails] = await Promise.all([
    tvDetailsRes,
    episodeDetailsRes,
  ]);

  const tvDetailsData = await tvDetails.json();
  const episodeVideosData = await episodeVideoDetails.json();

  const mergedData: TVEpisodeCastTransformedApiResponse = {
    tvDetails: tvDetailsData,
    episodeCastData: episodeVideosData,
  };

  const response: TVEpisodeCastTransformedApiResponse | ApiError = mergedData;

  if ("status_code" in response && response.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  if ("id" in response.tvDetails && response.episodeCastData) {
    const {
      first_air_date,
      id: tvId,
      poster_path,
      overview,
      name,
    } = response.tvDetails;

    const {
      air_date,
      name: episodeName,
      still_path: episodePoster,
      season_number,
      episode_number,
      credits,
    } = response.episodeCastData;

    const transformedData: TVEpisodeCastTransformedData = {
      first_air_date,
      name,
      episodeName,
      overview,
      poster_path,
      episodePoster,
      season_number,
      episode_number,
      air_date,
      tvId,
      cast: credits.cast,
      crew: credits.crew,
      guest_stars: credits.guest_stars,
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

const TVEpisodeImagesPage: React.FC<TVEpisodeCastPageProps> = ({ data }) => {
  const {
    name,
    first_air_date,
    episodeName,
    overview,
    poster_path,
    episodePoster,
    season_number,
    tvId,
    air_date,
    episode_number,
    cast,
    crew,
    guest_stars,
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
            }) — ${episodeName} — Відео — The Movie Database (TMDB)`}
        </title>
        <meta
          name="description"
          content={data ? (overview as string) : undefined}
        ></meta>
      </Head>
      <DetailsTabs id={tvId} title={`Поділитися ${name}`} type="tv" />
      <DetailsBanner
        id={tvId}
        title={`${episodeName}`}
        releaseDate={air_date}
        posterPath={
          episodePoster
            ? `https://image.tmdb.org/t/p/w160_and_h90_bestv2/${episodePoster}`
            : "https://placehold.co/58x/png/?text=Not+Found"
        }
        averageColor={averageColor}
        type="tv"
        customLink={
          <Link
            className="details-back-navigation"
            href={`/tv/${tvId}/seasons/${season_number}/episode/${episode_number}`}
          >
            ← Повернутись до серії
          </Link>
        }
        episodeNumber={episode_number}
        seasonNumber={season_number}
        imageType="backdrop"
        isBackdropLight={isBackdropLight}
      />
      <div className="app-container content-with-aside panel-details">
        <DetailLayout>
          <TVEpisodeCastBlock
            crew={crew}
            cast={cast}
            tvName={name}
            episodeName={episodeName}
            guest_stars={guest_stars}
          />
        </DetailLayout>
      </div>
    </>
  );
};

export default TVEpisodeImagesPage;
