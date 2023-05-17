import React from "react";
import { Layout, Menu, MenuProps } from "antd";
import styles from "./Header.module.scss";
import Link from "next/link";

const Header: React.FC = () => {
  const items2: MenuProps["items"] = [
    {
      key: "movies",
      label: "Фільми",
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
      label: "Серіали",
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
      label: "Персони",
    },
  ];

  return (
    <Layout.Header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.menuWrapper}>
            <Link href={"/"} className={styles.logo}>The Movie DB</Link>
            <Menu
              mode="horizontal"
              theme="dark"
              items={items2}
              className={styles.menu}
              style={{ minWidth: 0, flex: "auto" }}
            />
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
