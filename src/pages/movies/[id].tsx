import React from "react";
import DetailLayout from "@/components/layouts/DetailsLayout";
import { GetServerSidePropsContext } from 'next';
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";

interface MovieDetails {
  id: number;
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query;

  return { props: { id } };
};

const MovideDetails: React.FC<MovieDetails> = ({ id }) => {

  return (
    <>
      <DetailLayout>
        <MovieDetailsBlock id={id} />
      </DetailLayout>
    </>
  );
};

export default MovideDetails;
