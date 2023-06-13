import React from "react";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import { MenuProps } from "antd/es/menu";
import Link from "next/link";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";

import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const session_id = localStorage.getItem("session_id");

    getAccountDetails({ session_id }, true)
      .unwrap()
      .then((data) => console.log(data));
  }, []);

  const leftMenuItems: MenuProps["items"] = [
    {
      key: "movies",
      label: (
        <Link href={`/movies/popularMovies`} className={styles.link}>
          Фільми
        </Link>
      ),
      children: [
        {
          key: "movies/popularMovies",
          label: (
            <Link href={`/movies/popularMovies`} className={styles.link}>
              Популярні
            </Link>
          ),
          type: "group",
        },
        {
          key: "movies/now-playing",
          label: (
            <Link href={`/movies/now-playing`} className={styles.link}>
              Зараз у кіно
            </Link>
          ),
          type: "group",
        },
        {
          key: "movies/upcoming",
          label: (
            <Link href={`/movies/upcoming`} className={styles.link}>
              Очікувані
            </Link>
          ),
          type: "group",
        },
        {
          key: "movies/tap-rated",
          label: (
            <Link href={`/movies/top-rated`} className={styles.link}>
              Рейтингові
            </Link>
          ),
          type: "group",
        },
      ],
    },
    {
      key: "tv",
      label: (
        <Link href={`/movies/popularMovies`} className={styles.link}>
          Серіали
        </Link>
      ),
      children: [
        {
          key: "tv/popularTv",
          label: (
            <a className={styles.link} href="">
              Популярні
            </a>
          ),
          type: "group",
        },
        {
          key: "tv/airing-today",
          label: (
            <a className={styles.link} href="">
              Сьогодні в ефірі
            </a>
          ),
          type: "group",
        },
        {
          key: "tv/on-the-air",
          label: (
            <a className={styles.link} href="">
              Зараз на ТБ
            </a>
          ),
          type: "group",
        },
        {
          key: "tv/top-rated",
          label: (
            <a className={styles.link} href="">
              Рейтингові
            </a>
          ),
          type: "group",
        },
      ],
    },
    {
      key: "persons",
      label: (
        <Link href={`/movies/popularMovies`} className={styles.link}>
          Персони
        </Link>
      ),
    },
  ];

  const rightMenuItems: MenuProps["items"] = [
    {
      key: "account",
      label: (
        <Link href={`/login`} className={styles.link}>
          <UserOutlined style={{ fontSize: "1.3em" }} />
        </Link>
      ),
      children: [
        {
          key: "head",
          label: !isAccountDetailsLoading && accountDetails ? (
            <Link
              href={`/user/${accountDetails.username}`}
              className={styles.link}
            >
              <div className={styles.profileHead}>
                <img
                  src={`https://secure.gravatar.com/avatar/${accountDetails.avatar.gravatar.hash}.jpg?s=32`}
                  alt={accountDetails.username + "logo"}
                  className={styles.profileAvatar}
                />
                <h2>{accountDetails.username}</h2>
                <p>Мій профіль</p>
              </div>
            </Link>
          ) : <Link href={`/login`} className={styles.link}>Увійти</Link>,
          type: "group",
        },
        {
          key: "1",
          label: (
            <Link href={`/movies/popularMovies`} className={styles.link}>
              Списки
            </Link>
          ),
          type: "group",
        },
        {
          key: "2",
          label: (
            <Link href={`/movies/popularMovies`} className={styles.link}>
              Оцінки
            </Link>
          ),
          type: "group",
        },
        {
          key: "3",
          label: (
            <Link href={`/movies/popularMovies`} className={styles.link}>
              Переглянути пізніше
            </Link>
          ),
          type: "group",
        },
      ],
    },
    {
      key: "movies",
      label: (
        <Link href={`/movies/popularMovies`} className={styles.link}>
          <SearchOutlined style={{ fontSize: "1.3em" }} />
        </Link>
      ),
    },
  ];

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.menuWrapper}>
            <Link href={"/"} className={styles.logo}>
              The Movie DB
            </Link>
            <div className={styles.navigation}>
              <Menu
                mode="horizontal"
                theme="dark"
                items={leftMenuItems}
                className={styles.leftMenu}
                style={{ minWidth: 0, flex: "auto" }}
              />
              <Menu
                mode="horizontal"
                theme="dark"
                items={rightMenuItems}
                className={styles.rightMenu}
                style={{ minWidth: 0, flex: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
