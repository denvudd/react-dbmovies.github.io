import React from "react";
import { useGetListDetailsQuery } from "@/redux/api/lists/slice";
import { useRouter } from "next/router";

import DetailLayout from "@/layouts/DetailsLayout";
import ListDetailsHead from "@/components/ListDetailsBlock/ListDetailsHead/ListDetailsHead";
import ListDetailsBody from "@/components/ListDetailsBlock/ListDetailsBody/ListDetailsBody";

const ListDetailsPage: React.FC = () => {
  const router = useRouter();

  const { data: list, isLoading: isListsLoading } = useGetListDetailsQuery({
    id: Number(router.query.id),
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
