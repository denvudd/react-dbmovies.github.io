import React from "react";

import { useGetListDetailsQuery } from "@/redux/api/lists/slice";

import type { GetServerSidePropsContext } from "next";
import DetailLayout from "@/layouts/DetailsLayout";
import ListDetailsHead from "@/components/ListDetailsBlock/ListDetailsHead/ListDetailsHead";
import ListDetailsBody from "@/components/ListDetailsBlock/ListDetailsBody/ListDetailsBody";

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
