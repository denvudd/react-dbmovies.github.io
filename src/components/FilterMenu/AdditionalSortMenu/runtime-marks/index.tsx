import styles from '../AdditionalSortMenu.module.scss';

export const runtimeMarks = {
  values: {
    0: <span className={styles.mark}>0</span>,
    120: <span className={styles.mark}>120</span>,
    240: <span className={styles.mark}>240</span>,
    360: <span className={styles.mark}>360</span>,
  },
  range: [0, 120, 249, 360],
  step: 15,
};
