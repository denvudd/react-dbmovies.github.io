import React from "react";
import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import {
  getMovieDetails,
  getRunningQueriesThunk,
} from "@/redux/api/movies/slice";
import { wrapper } from "@/redux/store";

interface MovieDetails {
  id: number;
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
      props: { id: id },
    };
  }
);

const MovideDetails: React.FC<MovieDetails> = ({ id }) => {
  const { data } = getMovieDetails.useQuery({
    id,
    params: "language=uk-UA&page=1",
  });

  return (
    <>
      <DetailLayout>
        {data && <MovieDetailsBlock id={id} data={data} />}
      </DetailLayout>
    </>
  );
};

export default MovideDetails;
