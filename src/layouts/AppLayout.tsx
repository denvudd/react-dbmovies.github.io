import React from "react";
import { siteConfig } from "@/config/site";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { FloatButton, Layout } from "antd";
import Head from "next/head";
import BannerSupportUkraine from "@/components/UI/libs/banners/BannerSupportUkraine/BannerSupportUkraine";
interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout className="layout-main">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name={"description"}
          content={siteConfig.description}
        />
        <meta
          name="keywords"
          content={siteConfig.keywords}
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content={siteConfig.tileColor} />
        <meta property="og:type" content={siteConfig.openGraph.type} />
        <meta property="og:locale" content={siteConfig.openGraph.locale} />
        <meta property="og:site_name" content={siteConfig.openGraph.siteName} />
        <meta property="fb:app_id" content={siteConfig.fb.appId} />
        <meta name="twitter:site" content={siteConfig.twitter.site} />
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
