import React from "react";
import { useRouter } from "next/router";
import { useDeleteSessionMutation } from "@/redux/api/authentication/slice";
import { useSessionId } from "@/hooks/useSessionId";

import DetailLayout from "@/layouts/DetailsLayout";
import LogoutOutlined from "@ant-design/icons/lib/icons/LogoutOutlined";
import ButtonTMDB from "@/components/UI/ButtonTMDB/ButtonTMDB";

import styles from "./LogoutBlock.module.scss";

export const LogoutBlock = () => {
  const [deleteSession] = useDeleteSessionMutation();
  const sessionId = useSessionId();
  console.log(sessionId);
  
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

  return (
    <>
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
