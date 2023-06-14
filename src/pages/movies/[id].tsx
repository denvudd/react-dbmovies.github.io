import React from "react";
import {
  getMovieDetails,
  getRunningQueriesThunk,
} from "@/redux/api/movies/slice";

import DetailLayout from "@/layouts/DetailsLayout";
import MovieDetailsBlock from "@/components/MovieDetailsBlock/MovieDetailsBlock";
import { wrapper } from "@/redux/store";
import { MovieDetails } from "@/redux/api/movies/types/MovieDetailsType";

/* 
  The long cold start issue fix
  Relative issues: 
  #1 https://github.com/denvudd/react-dbmovies.github.io/issues/2
  #2 https://github.com/vercel/next.js/discussions/50783#discussioncomment-6139352
  #3 https://github.com/vercel/vercel/discussions/7961
  Documentation links:
  #1 https://nextjs.org/docs/pages/building-your-application/data-fetching/get-server-side-props#getserversideprops-with-edge-api-routes
*/
export const config = {
  runtime: 'experimental-edge', 
}
interface MovieDetailsPageProps {
  id: number;
  data: MovieDetails;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { id } = context.query;

    if (typeof id === "string") {
      await store.dispatch(
        getMovieDetails.initiate({ id: Number(id), params: "language=uk-UA&page=1" })
      );
    }

    const { data } = getMovieDetails.select({
      id: Number(id),
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