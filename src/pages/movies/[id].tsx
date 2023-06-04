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

interface MovieDetailsPageProps {
  id: number;
  data: MovieDetails;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;

    if (typeof id === "string") {
      await store.dispatch(
        getMovieDetails.initiate({ id, params: "language=uk-UA&page=1" })
      );
    }

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { },
    };
  }
);

const MovideDetailsPage: React.FC<MovieDetailsPageProps> = ({  }) => {
  const router = useRouter();
  const {data} = useGetMovieDetailsQuery({id: router.query.id});
  return (
    <>
      <div style={{ color: "#000" }}>{data?.id}</div>
    </>
  );
};

export default MovideDetailsPage;
