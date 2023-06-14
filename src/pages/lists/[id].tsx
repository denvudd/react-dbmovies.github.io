import React from "react";

import { useGetListDetailsQuery } from "@/redux/api/lists/slice";

import type { GetServerSidePropsContext } from "next";
import DetailLayout from "@/layouts/DetailsLayout";
import ListDetailsHead from "@/components/ListDetailsBlock/ListDetailsHead/ListDetailsHead";
import ListDetailsBody from "@/components/ListDetailsBlock/ListDetailsBody/ListDetailsBody";

/* 
  The long cold start issue fix
  Relative issues: 
  #1 https://github.com/denvudd/react-dbmovies.github.io/issues/2
  #2 https://github.com/vercel/next.js/discussions/50783#discussioncomment-6139352
  #3 https://github.com/vercel/vercel/discussions/7961
  Documentation links:
  #1 https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-with-edge-api-routes
*/
export const config = {
  runtime: 'experimental-edge', // warn: using an experimental edge runtime, the API might change
}

interface ListDetailsPageProps {
  id: number;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query;

  return { props: { id } };
};

const ListDetailsPage: React.FC<ListDetailsPageProps> = ({ id }) => {
  const { data: list, isLoading: isListsLoading } = useGetListDetailsQuery({
    id,
    params: "&language=uk-UA",
  });

  return (
    <>
      <DetailLayout>
        {!isListsLoading && list && (
          <ListDetailsHead
            id={list.id}
            listUsername={list.created_by}
            name={list.name}
            created_by={list.created_by}
            description={list.description}
            iso_639_1={list.iso_639_1}
            isEmpty={list.items.length === 0}
          />
        )}
        {!isListsLoading && list && (
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
