import React from "react";

import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/blocks/movie/MovieDetailsBlock/MovieDetailsBlock";
import Head from "next/head";
import DetailsTabs from "@/components/UI/tabs/DetailsTabs/DetailsTabs";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";
import type { GetServerSideProps } from "next/types";
import type { MovieDetails } from "@/redux/api/movies/types";

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

interface MovieDetailsPageProps {
  data: MovieDetails;
}

export const getServerSideProps: GetServerSideProps<{
  data: MovieDetails;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=684e3f73d1ca0e692a3016c028aabf72&language=uk-UA`
  );
  const data: MovieDetails | ApiError = await res.json();

  if ("status_code" in data && data.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  return { props: { data: data as MovieDetails } };
};

const MovieDetailsPage: React.FC<MovieDetailsPageProps> = ({ data }) => {
  const { id, title, poster_path, backdrop_path, overview, release_date } =
    data;

  const formattedOverview = data && overview ? overview : undefined;
  const description = formattedOverview
    ? formattedOverview
    : "The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.";
  const posterPath = poster_path
    ? `https://image.tmdb.org/t/p/w500/${poster_path}`
    : `https://placehold.co/314x471/png/?text=Not+Found`;
  const backdropPath = backdrop_path
    ? `https://image.tmdb.org/t/p/w780/${backdrop_path}`
    : `https://placehold.co/780x439/png/?text=Not+Found`;

  return (
    <>
      <Head>
        <title>
          {data &&
            `${title} (${
              release_date?.split("-")[0]
            }) — The Movie Database (TMDB)`}
        </title>
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:image" content={posterPath} />
        <meta property="og:image" content={backdropPath} />
        <meta property="og:type" content="video.movie" />
        <meta property="og:locale" content="uk-UA" />
        <meta
          property="og:url"
          content={`https://react-dbmovies.vercel.app/movies/${id}`}
        />
        <meta property="og:site_name" content="The Movie Database Next" />
        <meta name="twitter:card" content="photo" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={backdropPath} />
        <meta name="twitter:image:width" content="780" />
        <meta name="twitter:image:height" content="439" />
        <meta name="twitter:site" content="@themoviedb" />
        <meta
          name="twitter:url"
          content={`https://react-dbmovies.vercel.app/movies/${id}`}
        />
      </Head>
      <DetailsTabs id={id} title={`Поділитися ${title}`} />
      <DetailLayout>
        {data && <MovieDetailsBlock id={id} data={data} />}
      </DetailLayout>
    </>
  );
};

export default MovieDetailsPage;
