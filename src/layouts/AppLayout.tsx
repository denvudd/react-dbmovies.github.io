import React from "react";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FloatButton, Layout } from "antd";
import Head from "next/head";
import BannerSupportUkraine from "@/components/UI/BannerSupportUkraine/BannerSupportUkraine";
interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="layout-main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="The Movie Database (TMDB) is a popular, user editable database for movies and TV shows."
        />
        <meta
          name="keywords"
          content="Movies, TV Shows, Streaming, Reviews, API, Actors, Actresses, Photos, User Ratings, Synopsis, Trailers, Teasers, Credits, Cast"
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#032541" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="uk_UA" />
        <meta property="og:site_name" content="The Movie Database" />
        <meta property="fb:app_id" content="141280979243998" />
        <meta name="twitter:site" content="@themoviedb" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/favicon-16x16.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/assets/apple-touch-icon.png"
        ></link>
      </Head>
      <BannerSupportUkraine />
      <Header />
      <Layout.Content className="main">{children}</Layout.Content>
      <FloatButton.BackTop tooltip="Нагору" type="primary" />
      <Footer />
    </Layout>
  );
};

export default AppLayout;
