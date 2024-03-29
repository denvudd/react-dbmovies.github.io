import React from "react";

import DetailLayout from "@/layouts/DetailsLayout";
import ListDetailsHead from "@/components/blocks/ListDetailsBlock/ListDetailsHead/ListDetailsHead";
import ListDetailsBody from "@/components/blocks/ListDetailsBlock/ListDetailsBody/ListDetailsBody";
import ErrorPrivate from "@/components/UI/ErrorPrivate/ErrorPrivate";
import Head from "next/head";
import type { GetServerSideProps } from "next/types";
import type { ListDetailsApiResponse } from "@/redux/api/lists/types";
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

interface ListDetailsPageProps {
  id: string | string[] | undefined;
  list: ListDetailsApiResponse | ApiError;
}

export const getServerSideProps: GetServerSideProps<
  ListDetailsPageProps
> = async (context) => {
  const { id } = context.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/list/${id}?api_key=684e3f73d1ca0e692a3016c028aabf72&&language=uk-UA`
  );
  const list: ListDetailsApiResponse | ApiError = await res.json();
  return { props: { id: id, list } };
};

const ListDetailsPage: React.FC<ListDetailsPageProps> = ({ id, list }) => {
  const isError = "status_code" in list;
  const isPrivateList = isError && list.status_code === 34;

  return (
    <>
      <Head>
        <title>
          {(!isError && !isPrivateList ? list.name : "Приватний ресурс") +
            " — The Movie Database (TMDB)"}
        </title>
        <meta
          property="og:url"
          content={`https://react-dbmovies.vercel.app/lists/${id}`}
        />
        <link
          rel="canonical"
          href={`https://react-dbmovies.vercel.app/lists/${id}`}
        />
      </Head>
      <DetailLayout>
        {isError && isPrivateList && <ErrorPrivate />}
        {!isError && !isPrivateList && (
          <ListDetailsHead
            id={list.id}
            listUsername={list.created_by}
            name={list.name}
            created_by={list.created_by}
            description={list.description}
            iso_639_1={list.iso_639_1}
            isEmpty={list.items?.length === 0 ? true : false}
          />
        )}
        {!isError && !isPrivateList && (
          <ListDetailsBody
            items={list.items}
            item_count={list.item_count}
            favorite_count={list.favorite_count}
          />
        )}
      </DetailLayout>
    </>
  );
};

export default ListDetailsPage;
