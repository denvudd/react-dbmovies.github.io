import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";
import { useScrollingUp } from "@/hooks/useScrollingUp";
import { useIsMobile } from "@/hooks/useIsMobile";

import { Button, Layout, Menu, MenuProps } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import MobileMenuNav from "./nav/MobileMenuNav";
import MainNav from "./nav/MainNav";
import Link from "next/link";
import UserOutlined from "@ant-design/icons/lib/icons/UserOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import dynamic from "next/dynamic";
import classNames from "classnames";

import styles from "./Header.module.scss";

const DynamicSearchBar = dynamic(() => import("../SearchBar/SearchBar"));

const Header: React.FC = () => {
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();
  const { scrollingUp, isStart } = useScrollingUp();
  const [visible, setVisible] = React.useState(false);
  const isMobile = useIsMobile();

  const showDrawer = () => {
    setVisible(!visible);
  };

  React.useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      getAccountDetails({ session_id: sessionId }, true);
    }
  }, []);

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
        <Link
          href={`/login`}
          className={styles.link + " " + styles.linkProfile}
        >
          {!isAccountDetailsLoading && accountDetails ? (
            <img
              src={`https://secure.gravatar.com/avatar/${accountDetails.avatar.gravatar.hash}.jpg?s=32`}
              alt={accountDetails.username + " logo"}
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
                aria-disabled={true}
              >
                <div className={styles.profileHead}>
                  <h2>{accountDetails.username}</h2>
                  <p>Мій профіль</p>
                </div>
              </Link>
            ) : (
              <Link
                href={`/login`}
                aria-disabled={true}
                className={styles.link}
              >
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
        stickyHeader: scrollingUp && !isStart && !isMobile,
        "nav-up": !scrollingUp && !isMobile,
        "header-start": isStart && !isMobile,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.menuWrapper}>
            <Button
              className={styles.mobileMenuButton}
              type="text"
              onClick={showDrawer}
              style={{ fontSize: "1.3em", color: "#fff" }}
            >
              <MenuOutlined />
            </Button>
            <Link href={"/"} className={styles.logo}>
              TMDB
            </Link>
            <div className={styles.navigation}>
              <MainNav />
              <Menu
                mode="horizontal"
                theme="dark"
                items={rightMenuItems}
                className={styles.rightMenu}
                style={{ minWidth: 0, flex: "auto" }}
                selectable={false}
                triggerSubMenuAction={isMobile ? "click" : "hover"}
                disabledOverflow={isMobile ? true : false}
              />
              <MobileMenuNav visible={visible} setVisible={setVisible} />
            </div>
          </div>
        </div>
      </div>
    </Layout.Header>
  );
};

export default Header;
