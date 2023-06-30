import React from 'react';

import styles from './HomeSearch.module.scss'

const HomeSearch: React.FC = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} action="/search">
        <label>
          <input className={styles.search} type="text" tabIndex={1} placeholder='Пошук фільму, серіалу, персони...' />
        </label>
        <button className={styles.submit}>Пошук</button>
      </form>
    </div>
  );
};

export default HomeSearch;