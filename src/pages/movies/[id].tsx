import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import {
  getMovieDetails,
  getRunningQueriesThunk,
} from "@/redux/api/movies/slice";
import { wrapper } from "@/redux/store";
import { Spin } from "antd";
import { MovieDetails } from "@/redux/api/movies/types/MovieDetailsType";

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

    const { data } = getMovieDetails.select({
      id,
      params: "language=uk-UA&page=1",
    })(store.getState());

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: { id, data },
    };
  }
);

const MovideDetailsPage: React.FC<MovieDetailsPageProps> = ({ id, data }) => {
  return (
    <>
      <DetailLayout>
        {data && <MovieDetailsBlock id={id} data={data} />}
      </DetailLayout>
    </>
  );
};

export default MovideDetailsPage;
