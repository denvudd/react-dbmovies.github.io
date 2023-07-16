import styles from "../AdditionalSortMenu.module.scss";

export const voteAverageMarks = {
  values: {
    0: <span className={styles.mark}>0</span>,
    5: <span className={styles.mark}>5</span>,
    10: <span className={styles.mark}>10</span>,
  },
  range: [0, 10],
};

export const voteCountMarks = {
  values: {
    0: <span className={styles.mark}>0</span>,
    100: <span className={styles.mark}>100</span>,
    200: <span className={styles.mark}>200</span>,
    300: <span className={styles.mark}>300</span>,
    400: <span className={styles.mark}>400</span>,
    500: <span className={styles.mark}>500</span>,
  },
  range: [0, 100, 200, 300, 400, 500],
  step: 50,
};
