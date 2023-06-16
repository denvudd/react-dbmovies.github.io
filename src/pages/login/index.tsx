import React from "react";

import Head from "next/head";
import LoginBlock from "@/auth/LoginBlock/LoginBlock";

export const LoginPage = () => {
  return (
    <>
      <Head>
        <title>Увійти — The Movie Database (TMDB)</title>
      </Head>
      <LoginBlock/>
    </>
  );
};

export default LoginPage;
