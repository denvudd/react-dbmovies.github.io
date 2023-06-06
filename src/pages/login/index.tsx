import React from "react";
import Head from "next/head";
import DetailLayout from "@/layouts/DetailsLayout";
import { Button, Typography } from "antd";
import {
  useLazyGetAuthTokenQuery,
  usePostCreateSessionMutation,
} from "@/redux/api/authentication/slice";
import { useRouter } from "next/router";

export const LoginPage = () => {
  const [getAuthToken,] =
    useLazyGetAuthTokenQuery();
  const [createSession] =
    usePostCreateSessionMutation();
  const router = useRouter();
  const { request_token, approved } = router.query;

  const handleButtonClick = async () => {
    try {
      getAuthToken({})
        .unwrap()
        .then((data) => {
          if (data.request_token) {
            window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=http://localhost:3000/login`;
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    if (request_token && approved) {
      try {
        createSession({ request_token })
          .unwrap()
          .then((data) => {
            if (data.success) {
              localStorage.setItem("session_id", data.session_id);
              router.push('/')
            }
          });
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }, [request_token, approved]);

  React.useEffect(() => {
    const token = localStorage.getItem("session_id");

    if (token !== null) {
      router.push('/');
    }
  }, [])

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailLayout>
        <div className="app-container">
          <Typography.Title style={{ paddingTop: "20px" }} level={1}>
            Залогінтеся
          </Typography.Title>
          <Typography.Paragraph>
            Авторизація додатку працює на базі технології OAuth, мета якої
            давати користувачам змогу авторизовуватись шляхом споміжних
            сервісів. Додаток працює завдяки відкритому Rest API бази даних
            TMDB, тож вхід користувача і всі дії, які зачепають редагування
            профіля можна здійснити тільки завдяки логіну в TMDB.
          </Typography.Paragraph>
          <Button onClick={handleButtonClick} type="primary" size="large">
            Увійти через The Movie Data Base
          </Button>
        </div>
      </DetailLayout>
    </>
  );
};

export default LoginPage;
