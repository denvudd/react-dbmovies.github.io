import Head from "next/head";
import DetailLayout from "@/layouts/DetailsLayout";
import HomeBlock from "@/components/blocks/HomeBlock/HomeBlock";

export const Home = () => {
  return (
    <>
      <Head>
        <title>The Movie Database (TMDB)</title>
      </Head>
      <DetailLayout>
        <HomeBlock/>
      </DetailLayout>
    </>
  );
};

export default Home;
