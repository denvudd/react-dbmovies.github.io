import React from "react";

import DetailLayout from "@/layouts/DetailsLayout";
import ListNewBlock from "@/components/ListNewBlock/ListNewBlock";
import Head from "next/head";
import { withAuth } from "@/auth/withAuth";

const ListNewPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Створити список — The Movie Database (TMDB)</title>
      </Head>
      <DetailLayout>
        <div className="app-container">
          <ListNewBlock />
        </div>
      </DetailLayout>
    </>
  );
};

export default withAuth(ListNewPage);
