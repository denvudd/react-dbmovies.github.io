import React from "react";
import { MovieDetails } from "@/redux/api/movies/types/MovieDetailsType";

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
