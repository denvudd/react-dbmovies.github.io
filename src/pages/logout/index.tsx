import React from "react";

import Head from "next/head";
import LogoutBlock from "@/auth/LogoutBlock/LogoutBlock";
import { withAuth } from "@/auth/withAuth";

export const LoginPage = () => {
  return (
    <>
      <Head>
      <title>Вийти — The Movie Database (TMDB)</title>
      </Head>
      <LogoutBlock/>
    </>
  );
};

export default withAuth(LoginPage);
