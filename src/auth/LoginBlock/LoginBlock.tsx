import React from "react";
import { useRouter } from "next/router";
import {
  useLazyGetAuthTokenQuery,
  usePostCreateSessionMutation,
} from "@/redux/api/authentication/slice";

import DetailLayout from "@/layouts/DetailsLayout";
import ButtonTMDB from "@/components/UI/ButtonTMDB/ButtonTMDB";
import LoginOutlined from "@ant-design/icons/lib/icons/LoginOutlined";

import styles from "./LoginBlock.module.scss";

export const LoginBlock = () => {
  const [getAuthToken] = useLazyGetAuthTokenQuery();
  const [createSession] = usePostCreateSessionMutation();
  const router = useRouter();
  const { request_token, approved } = router.query;

  const handleButtonClick = async () => {
    try {
      getAuthToken(null)
        .unwrap()
        .then((data) => {
          if (data.request_token) {
            window.location.href = `https://www.themoviedb.org/authenticate/${data.request_token}?redirect_to=https://react-dbmovies.vercel.app/login`;
          }
        });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  React.useEffect(() => {
    console.log(request_token);
    
    if (request_token && approved) {
      try {
        createSession(request_token as string)
          .unwrap()
          .then((data) => {
            if (data.success) {
              localStorage.setItem("session_id", data.session_id);
              router.reload();
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
      router.push("/");
    }
  }, []);

  return (
    <>
      <DetailLayout>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              <span><LoginOutlined /></span>
              Залогінтеся
            </h1>
            <p className={styles.text}>
              Авторизація додатку працює на базі технології{" "}
              <a href="https://uk.wikipedia.org/wiki/OAuth">OAuth</a>, мета якої
              давати користувачам змогу авторизовуватись шляхом споміжних
              сервісів. Додаток працює завдяки відкритому Rest API бази даних
              The Movie Database, тож вхід користувача і всі дії, які зачепають
              редагування профіля можна здійснити тільки завдяки входу в TMDB.
            </p>
            <ButtonTMDB
              type="secondary"
              onClick={handleButtonClick}
              rounded
              roundedSize={8}
            >
              Увійти через TMDB
            </ButtonTMDB>
            <ButtonTMDB type="secondary" rounded roundedSize={8}>
              Увійти як гість
            </ButtonTMDB>
          </div>
        </div>
      </DetailLayout>
    </>
  );
};

export default LoginBlock;
