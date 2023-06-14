import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import { MovieDetails } from "@/redux/api/movies/types/MovieDetailsType";
import { GetServerSideProps } from "next/types";

export const config = {
  runtime: "experimental-edge",
};

interface MovieDetailsPageProps {
  data: MovieDetails;
}

export const getServerSideProps: GetServerSideProps<{
  data: MovieDetails;
}> = async (context) => {
  const { id } = context.query;
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=684e3f73d1ca0e692a3016c028aabf72&language=uk-UA`);
  const data = await res.json();
  return { props: { data } };
};

const MovideDetailsPage: React.FC<MovieDetailsPageProps> = ({ data }) => {
  const { id } = data;
  return (
    <>
      <DetailLayout>
        {data && <MovieDetailsBlock id={id} data={data} />}
      </DetailLayout>
    </>
  );
};

export default MovideDetailsPage;
