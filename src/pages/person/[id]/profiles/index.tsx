import React from "react";

import Head from "next/head";
import DetailsSider from "@/components/UI/DetailsSider/DetailsSider";
import DetailsBanner from "@/components/UI/banners/DetailsBanner/DetailsBanner";
import DetailsTabs from "@/components/UI/tabs/DetailsTabs/DetailsTabs";
import ListLayout from "@/layouts/ListLayout";
import PersonTranslationBlock from "@/components/blocks/person/PersonTranslationBlock/PersonTranslationBlock";

import type { GetServerSideProps } from "next/types";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import type {
  PersonDetails,
  PersonImagesApiResponse,
} from "@/redux/api/people/types";
import type { Image } from "@/redux/api/types/common";
import DetailLayout from "@/layouts/DetailsLayout";
import MovieImagesBlock from "@/components/blocks/movie/MovieImagesBlock/MovieImagesBlock";

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

type PersonImagesPageApiResponse = PersonDetails & {
  images: PersonImagesApiResponse;
};

export interface PersonImagesPageProps {
  data: PersonImagesTransformedData;
}

interface PersonImagesTransformedData {
  profiles: Image[];
  profile_path: string | null;
  biography: string | null;
  id: number;
  name: string;
}

export const getServerSideProps: GetServerSideProps<{
  data: PersonImagesTransformedData;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?append_to_response=images&language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const response: PersonImagesPageApiResponse | ApiError = await res.json();

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
      images,
      id: movieId,
      profile_path,
      biography,
      name,
    } = response;

    const transformedData: PersonImagesTransformedData = {
      profiles: images.profiles,
      id: movieId,
      profile_path,
      biography,
      name,
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

const PersonTranslationsPage: React.FC<PersonImagesPageProps> = ({ data }) => {
  const { profile_path, name, biography, profiles, id } = data;

  const averageColor = {
    backgroundColor: `#e3e3e3`,
  };

  return (
    <>
      <Head>
        <title>
          {data && `${name} — Переклади — The Movie Database (TMDB)`}
        </title>
        <meta
          name="description"
          content={data ? (biography as string) : undefined}
        ></meta>
      </Head>
      <DetailsTabs id={id} title={`Поділитися ${name}`} type="person" />
      <DetailsBanner
        id={id}
        title={name}
        releaseDate={null}
        posterPath={
          profile_path
            ? `https://image.tmdb.org/t/p/w58_and_h87_face/${profile_path}`
            : "https://placehold.co/58x/png/?text=Not+Found"
        }
        averageColor={averageColor}
        type="person"
        isBackdropLight={true}
      />
      <div className="app-container panel-details">
        <DetailLayout>
          <MovieImagesBlock images={profiles} title={name} type="poster" />
        </DetailLayout>
      </div>
    </>
  );
};

export default PersonTranslationsPage;
