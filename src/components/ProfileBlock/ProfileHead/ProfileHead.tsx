import React from "react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Popover, message } from "antd";
import { AccountDetailsApiResponse } from "@/redux/api/account/types/AccountDetailsType";
import styles from "./ProfileHead.module.scss";

type ProfileHeadProps = AccountDetailsApiResponse;

const ProfileHead: React.FC<ProfileHeadProps> = ({
  id,
  username,
  avatar,
  iso_3166_1,
}) => {
  const [value, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickCopy = (value: string) => {
    copy(value);
    if (value !== null) {
      messageApi.success(`Текст скопійовано: ${value}`);
    }
  };

  return (
    <div className={styles.bgImage}>
      {contextHolder}
      <div className={styles.bgGradient}>
        <div className={styles.innerContent}>
          <div className="app-container">
            <div className={styles.content}>
              <span className={styles.avatar}>
                <a href="">
                  <img
                    src={`https://secure.gravatar.com/avatar/${avatar.gravatar.hash}.jpg?s=150`}
                    alt=""
                  />
                </a>
              </span>
              <div className={styles.text}>
                <div className={styles.about}>
                  <h2>
                    {username}{" "}
                    <Popover
                      color={value !== null ? `green` : ""}
                      content={
                        value !== null ? (
                          <span style={{ color: "#fff" }}>Скопійовано!</span>
                        ) : (
                          <span>Скопіювати</span>
                        )
                      }
                    >
                      <span onClick={() => handleClickCopy(`${id}`)}>#{id}</span>
                    </Popover>
                  </h2>
                  <p>Країна: {iso_3166_1}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHead;
