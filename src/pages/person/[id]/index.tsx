import React from "react";

import DetailLayout from "@/layouts/DetailsLayout";
import PersonDetailsBlock from "@/components/blocks/person/PersonDetailsBlock/PersonDetailsBlock";
import Head from "next/head";
import DetailsTabs from "@/components/UI/tabs/DetailsTabs/DetailsTabs";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import type { GetServerSideProps } from "next/types";
import type { PersonDetails } from "@/redux/api/people/types";

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

interface PersonDetailsPageProps {
  data: PersonDetails;
}

export const getServerSideProps: GetServerSideProps<{
  data: PersonDetails;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/person/${id}?api_key=684e3f73d1ca0e692a3016c028aabf72&language=uk-UA`
  );
  const data: PersonDetails | ApiError = await res.json();

  if ("status_code" in data && data.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: { data: data as PersonDetails } };
};

const MovieDetailsPage: React.FC<PersonDetailsPageProps> = ({ data }) => {
  const {
    id,
    name,
    biography,
    profile_path,
  } = data;

  const formattedOverview = data && biography ? biography : undefined;
  const description = formattedOverview
    ? formattedOverview
    : "The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.";
  const posterPath = profile_path
    ? `https://image.tmdb.org/t/p/w500/${profile_path}`
    : `https://placehold.co/314x471/png/?text=Not+Found`;

  return (
    <>
      <Head>
        <title>{data && `${name} — The Movie Database (TMDB)`}</title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={name} />
        <meta property="og:image" content={posterPath} />
        <meta property="og:image" content={posterPath} />
        <meta property="og:type" content="actor" />
        <meta property="og:locale" content="uk-UA" />
        <meta
          property="og:url"
          content={`https://react-dbmovies.vercel.app/person/${id}`}
        />
        <meta property="og:site_name" content="The Movie Database Next" />
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:title" content={name} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={posterPath} />
        <meta name="twitter:image:width" content="780" />
        <meta name="twitter:image:height" content="439" />
        <meta name="twitter:site" content="@themoviedb" />
        <meta
          name="twitter:url"
          content={`https://react-dbmovies.vercel.app/person/${id}`}
        />
      </Head>
      <DetailsTabs id={id} title={`Поділитися сторінкою з ${name}`} type="person" />
      <DetailLayout>
        {data && <PersonDetailsBlock id={id} data={data} />}
      </DetailLayout>
    </>
  );
};

export default MovieDetailsPage;
