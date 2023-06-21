import React from "react";

import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import type { MovieDetails } from "@/redux/api/movies/types";
import DetailsTabs from "@/components/UI/DetailsTabs/DetailsTabs";

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
  const data: MovieDetails = await res.json();
  return { props: { data } };
};

const MovideDetailsPage: React.FC<MovieDetailsPageProps> = ({ data }) => {
  const { id } = data;

  const overview = data && data.overview ? data.overview : undefined;
  const description = overview
    ? overview
    : "The Movie Database (TMDB) is a popular, user editable database for movies and TV shows.";
  return (
    <>
      <Head>
        <title>
          {data
            ? `${data.title} (${data.release_date?.split("-")[0]})`
            : "Не знайдено"}{" "}
          — The Movie Database (TMDB)
        </title>
        <meta name="description" content={description}></meta>
      </Head>
      <DetailsTabs id={data.id}/>
      <DetailLayout>
        {data && <MovieDetailsBlock id={id} data={data} />}
      </DetailLayout>
    </>
  );
};

export default MovideDetailsPage;
