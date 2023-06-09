import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";

import { Affix, Layout, Menu, MenuProps } from "antd";
import Link from "next/link";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import dynamic from "next/dynamic";

import styles from "./Header.module.scss";
import { useScrollingUp } from "@/hooks/useScrollingUp";
import classNames from "classnames";

const DynamicSearchBar = dynamic(() => import("../SearchBar/SearchBar"));

const Header: React.FC = () => {
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();
  const { scrollingUp, isStart } = useScrollingUp();

  React.useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      getAccountDetails({ session_id: sessionId }, true)
        .unwrap()
        .then((data) => console.log(data));
    }
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
          key: "movies/top-rated",
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
        <Link href={`/tv/popularTV`} className={styles.link}>
          Серіали
        </Link>
      ),
      children: [
        {
          key: "tv/popularTV",
          label: (
            <Link href={`/tv/popularTV`} className={styles.link}>
              Популярні
            </Link>
          ),
          type: "group",
        },
        {
          key: "tv/airing-today",
          label: (
            <Link href={`/tv/airing-today`} className={styles.link}>
              Сьогодні в ефірі
            </Link>
          ),
          type: "group",
        },
        {
          key: "tv/on-the-air",
          label: (
            <Link href={`/tv/on-the-air`} className={styles.link}>
              Зараз на ТБ
            </Link>
          ),
          type: "group",
        },
        {
          key: "tv/top-rated",
          label: (
            <Link href={`/tv/top-rated`} className={styles.link}>
              Рейтингові
            </Link>
          ),
          type: "group",
        },
      ],
    },
    {
      key: "persons",
      label: (
        <Link href={`/person/popular`} className={styles.link}>
          Персони
        </Link>
      ),
    },
  ];

  const rightMenuItems: MenuProps["items"] = [
    {
      key: "add-new-element",
      label: (
        <PlusOutlined
          style={{ fontSize: "1.4em" }}
          className={styles.boldIcon}
        />
      ),
      children: [
        {
          key: "add-new-movie",
          label: (
            <a
              href={"https://www.themoviedb.org/movie/new"}
              className={styles.link}
              target="_blank"
            >
              Додати новий фільм
            </a>
          ),
          type: "group",
        },
        {
          key: "add-new-tv",
          label: (
            <a
              href={"https://www.themoviedb.org/tv/new"}
              className={styles.link}
              target="_blank"
            >
              Додати новий серіал
            </a>
          ),
          type: "group",
        },
      ],
    },
    {
      key: "account",
      label: (
        <Link href={`/login`} className={styles.link}>
          {!isAccountDetailsLoading && accountDetails ? (
            <img
              src={`https://secure.gravatar.com/avatar/${accountDetails.avatar.gravatar.hash}.jpg?s=32`}
              alt={accountDetails.username + "logo"}
              className={styles.profileAvatarOutside}
            />
          ) : (
            <UserOutlined style={{ fontSize: "1.3em" }} />
          )}
        </Link>
      ),
      children: [
        {
          key: "head",
          label:
            !isAccountDetailsLoading && accountDetails ? (
              <Link
                href={`/user/${accountDetails.username}`}
                className={styles.link}
              >
                <div className={styles.profileHead}>
                  <h2>{accountDetails.username}</h2>
                  <p>Мій профіль</p>
                </div>
              </Link>
            ) : (
              <Link href={`/login`} className={styles.link}>
                Увійти
              </Link>
            ),
          type: "group",
        },
        {
          key: "favorite",
          label: (
            <Link
              href={`/user/${accountDetails?.username}/favorite`}
              className={styles.link}
            >
              Уподобання
            </Link>
          ),
          type: "group",
        },
        {
          key: "lists",
          label: (
            <Link
              href={`/user/${accountDetails?.username}/lists`}
              className={styles.link}
            >
              Списки
            </Link>
          ),
          type: "group",
        },
        {
          key: "rated",
          label: (
            <Link
              href={`/user/${accountDetails?.username}/rated`}
              className={styles.link}
            >
              Оцінки
            </Link>
          ),
          type: "group",
        },
        {
          key: "watchlist",
          label: (
            <Link
              href={`/user/${accountDetails?.username}/watchlist`}
              className={styles.link}
            >
              Переглянути пізніше
            </Link>
          ),
          type: "group",
        },
        {
          key: "logout",
          label: !isAccountDetailsLoading && accountDetails && (
            <Link
              href={`/logout`}
              className={styles.link + " " + styles.footer}
            >
              Вийти
            </Link>
          ),
          type: "group",
        },
      ],
    },
    {
      key: "search",
      label: <DynamicSearchBar />,
    },
  ];

  return (
    <Layout.Header
      className={classNames(styles.header, {
        stickyHeader: scrollingUp && !isStart,
        "nav-up": !scrollingUp,
        "header-start": isStart,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.menuWrapper}>
            <Link href={"/"} className={styles.logo}>
              THE MOVIE DB
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
                selectable={false}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
