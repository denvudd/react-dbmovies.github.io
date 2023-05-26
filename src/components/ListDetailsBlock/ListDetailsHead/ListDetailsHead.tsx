import React from "react";
import { useGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { Popover, message } from "antd";
import Link from "next/link";

import styles from "./ListDetailsHead.module.scss";

interface ListDetailsHeadProps {
  name: string;
  created_by: string;
  description: string;
  id: string;
  iso_639_1: string;
}

const ListDetailsHead: React.FC<ListDetailsHeadProps> = ({
  name,
  created_by,
  description,
  id,
  iso_639_1
}) => {
  const { avatar } = useGetAccountDetailsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      avatar: data?.avatar.tmdb ? data?.avatar.tmdb : data?.avatar.gravatar,
    }),
  });
  const [value, copy] = useCopyToClipboard();
  const [messageApi, contextHolder] = message.useMessage();

  const handleClickCopy = (value: string) => {
    copy(value);
    if (value !== null) {
      messageApi.success(`Текст скопійовано: ${value}`);
    }
  };

  return (
    <div className={styles.head}>
      {contextHolder}
      <section className="app-container">
        <div className={styles.content}>
          <h2>
            Список {`"${name}"`}
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
          <h4>Мова списку: {iso_639_1.toUpperCase()}</h4>
          <div className={styles.account}>
            <Link href={`/user/${created_by}`}>
              <img
                src={`https://secure.gravatar.com/avatar/${avatar}.jpg?s=50`}
                alt=""
              />
            </Link>
            <p>
              Лист користувача
              <br />
              <Link href={`/user/${created_by}`}>{created_by}</Link>
            </p>
          </div>
          <h3>Про цей список</h3>
          <div className={styles.description}>
            <p>{description}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ListDetailsHead;
