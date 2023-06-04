import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import {
  getMovieDetails,
  getRunningQueriesThunk,
} from "@/redux/api/movies/slice";
import { wrapper } from "@/redux/store";
import { MovieDetails } from "@/redux/api/movies/types/MovieDetailsType";
import { useGetMovieDetailsQuery } from "@/redux/api/movies/slice";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";

interface MovieDetailsPageProps {
  id: number;
  data: MovieDetails;
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  return { props: { data: repo } };
};

const MovideDetailsPage: React.FC<MovieDetailsPageProps> = ({ data }) => {
  
  return (
    <>
      <div style={{ color: "#000" }}>{data?.id}</div>
    </>
  );
};

export default MovideDetailsPage;
