import React from "react";
import { useLazyGetAccountDetailsQuery } from "@/redux/api/account/slice";

import { Layout } from "antd";
import Link from "next/link";
import { footerNav } from "./nav/footer-nav";

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

  const menu = footerNav;

  return (
    <Layout.Footer className={styles.footer}>
      <div className="app-container">
        <nav className={styles.nav}>
          <div className={styles.col}>
            <h2 className={styles.logo}>THE MOVIE DATABASE</h2>
            <Link
              className={styles.user}
              href={accountDetails ? `/user/${accountDetails.username}` : "/"}
            >
              Привіт{accountDetails && `, ${accountDetails.username}`}!
            </Link>
          </div>
          {menu}
        </nav>
      </div>
    </Layout.Footer>
  );
};

export default Footer;
