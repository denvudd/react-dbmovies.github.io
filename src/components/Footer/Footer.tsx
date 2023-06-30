import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";

import { Layout } from "antd";
import Link from "next/link";

import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  const [
    getAccountDetails,
    { data: accountDetails, isLoading: isAccountDetailsLoading },
  ] = useLazyGetAccountDetailsQuery();

  React.useEffect(() => {
    const sessionId = localStorage.getItem("session_id");

    if (sessionId) {
      getAccountDetails({ session_id: sessionId }, true);
    }
  }, []);

  return (
    <Layout.Footer className={styles.footer}>
      <div className="app-container">
        <nav className={styles.nav}>
          <div className={styles.col}>
            <h2 className={styles.logo}>THE MOVIE DATABASE</h2>
            <Link className={styles.user} href={accountDetails ? `/user/${accountDetails.username}` : "/"}>
              Привіт{accountDetails && `, ${accountDetails.username}`}!
            </Link>
          </div>
          <div className={styles.col}>
            <h3>Основи</h3>
            <ul>
              <li>
                <a href="https://www.themoviedb.org/about">Про TMDB</a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/about/staying-in-touch">
                  Зв’язок із нами
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/talk">Форуми підтримки</a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/login?to=read_me&redirect_uri=/docs">
                  API
                </a>
              </li>
              <li>
                <a href="https://status.themoviedb.org/">Стан системи</a>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h3>Узяти участь</h3>
            <ul>
              <li>
                <a href="https://www.themoviedb.org/bible">
                  Біблія зі сприяння
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/movie/new">
                  Додати новий фільм
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/tv/new">
                  Додати новий серіал
                </a>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h3>Спільнота</h3>
            <ul>
              <li>
                <a href="https://www.themoviedb.org/documentation/community/guidelines">
                  Поради
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/discuss">Обговорення</a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/leaderboard">
                  Таблиця лідерів
                </a>
              </li>
              <li>
                <a href="https://twitter.com/themoviedb">Twitter</a>
              </li>
            </ul>
          </div>
          <div className={styles.col}>
            <h3>Угоди</h3>
            <ul>
              <li>
                <a href="https://www.themoviedb.org/terms-of-use">
                  Умови користування
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/documentation/api/terms-of-use">
                  Правила використання API
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/privacy-policy">
                  Політика конфіденційності
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
