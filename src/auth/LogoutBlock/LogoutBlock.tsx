import React from "react";
import { useRouter } from "next/router";
import { useDeleteSessionMutation } from "@/redux/api/authentication/slice";

import Head from "next/head";
import DetailLayout from "@/layouts/DetailsLayout";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import ButtonTMDB from "@/components/UI/ButtonTMDB/ButtonTMDB";

import styles from "./LogoutBlock.module.scss";

export const LogoutBlock = () => {
  const [deleteSession] = useDeleteSessionMutation();
  const [sessionId, setSessionId] = React.useState<string | null>(null);
  const router = useRouter();

  const handleClickSubmit = async () => {
    try {
      if (sessionId) {
        deleteSession(sessionId)
          .unwrap()
          .then((data) => {
            if (data.success) {
              localStorage.removeItem("session_id");
              router.reload();
            }
          });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClickCancel = () => {
    router.push("/");
  };

  React.useEffect(() => {
    setSessionId(localStorage.getItem("session_id"));
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DetailLayout>
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              <span>
                <LogoutOutlined />
              </span>
              Вийти
            </h1>
            <p className={styles.text}>
              Ви впевненні, що хочете вийти з аккаунту?
            </p>
            <ButtonTMDB
              type="success"
              onClick={handleClickSubmit}
              rounded
              roundedSize={8}
            >
              Так
            </ButtonTMDB>
            <ButtonTMDB
              type="failure"
              onClick={handleClickCancel}
              rounded
              roundedSize={8}
            >
              Ні
            </ButtonTMDB>
          </div>
        </div>
      </DetailLayout>
    </>
  );
};

export default LogoutBlock;
