import React from "react";
import LockOutlined from "@ant-design/icons/lib/icons/LockOutlined";
import styles from "./ErrorPrivate.module.scss";

const ErrorPrivate = () => {
  return (
    <div className="app-container">
      <div className={styles.inner}>
        <div className={styles.head}>
          <span className={styles.icon}>
            <LockOutlined />
          </span>
          <h2 className={styles.title}>Ця сторінка приватна</h2>
        </div>
        <p className={styles.text}>
          Схоже, ви на маєте доступу до цієї сторінки. Якщо Ви думаєте, що
          сталась помилка, дайте нам знати{" "}
          <a target="_blank" href="https://www.themoviedb.org/talk">на форумі</a>.
        </p>
      </div>
    </div>
  );
};

export default ErrorPrivate;
