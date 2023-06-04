import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import {
  getMovieDetails,
  getRunningQueriesThunk,
} from "@/redux/api/movies/slice";
import { wrapper } from "@/redux/store";
import { MovieDetails } from "@/redux/api/movies/types/MovieDetailsType";
import { GetServerSideProps } from "next";
interface MovieDetailsPageProps {
  id: number;
  data: MovieDetails;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return { props: { id }};
};


const MovideDetailsPage: React.FC<MovieDetailsPageProps> = ({ id, data }) => {
  return (
    <>
      <div style={{color: "#000"}}>{id}</div>
    </>
  );
};

export default MovideDetailsPage;