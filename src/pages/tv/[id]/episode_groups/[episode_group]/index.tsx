import React from "react";

import Head from "next/head";
import DetailsTabs from "@/components/UI/tabs/DetailsTabs/DetailsTabs";
import DetailLayout from "@/layouts/DetailsLayout";
import TVEpisodeGroupDetailsBlock from "@/components/blocks/tv/TVEpisodeGroupDetailsBlock/TVEpisodeGroupDetailsBlock";

import type { GetServerSideProps } from "next/types";
import type { TVEpisodeGroupDetailsApiResponse } from "@/redux/api/tv/types";
import type { ApiError } from "@/redux/api/baseApi/types/ErrorType";

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

interface TVSingleEpisodeGroupPageProps {
  data: TVEpisodeGroupDetailsApiResponse;
  id: number;
}

export const getServerSideProps: GetServerSideProps<{
  data: TVEpisodeGroupDetailsApiResponse;
}> = async (context) => {
  const { id, episode_group } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/episode_group/${episode_group}?language=uk-UA&api_key=684e3f73d1ca0e692a3016c028aabf72`
  );
  const response: TVEpisodeGroupDetailsApiResponse | ApiError =
    await res.json();

  if ("status_code" in response && response.status_code === 34) {
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  }

  if ("id" in response && response.id) {
    return {
      props: { data: response as TVEpisodeGroupDetailsApiResponse, id },
    };
  } else {
    return {
      redirect: {
        permanent: false,
        destination: "/505",
      },
    };
  }
};

const TVSeasonsPage: React.FC<TVSingleEpisodeGroupPageProps> = ({
  data,
  id,
}) => {
  const { name } = data;

  return (
    <>
      <Head>
        <title>
          {data && `${name} — Групи серій — The Movie Database (TMDB)`}
        </title>
      </Head>
      <DetailsTabs id={id} title={`Поділитися серіалом`} type="tv" />
      <div className="content-with-aside" style={{ paddingBottom: "30px" }}>
        <DetailLayout>
          <TVEpisodeGroupDetailsBlock seriesId={id} episodeGroup={data} />
        </DetailLayout>
      </div>
    </>
  );
};

export default TVSeasonsPage;
