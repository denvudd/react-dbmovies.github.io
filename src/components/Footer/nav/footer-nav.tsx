import { siteConfig } from "@/config/site";
import styles from '../Footer.module.scss';

export const footerNav = (
  <>
    <div className={styles.col}>
      <h3>Основи</h3>
      <ul>
        {siteConfig.footerNav[0][0].items.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.col}>
      <h3>Узяти участь</h3>
      <ul>
        {siteConfig.footerNav[1][0].items.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.col}>
      <h3>Спільнота</h3>
      <ul>
        {siteConfig.footerNav[2][0].items.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
    <div className={styles.col}>
      <h3>Угоди</h3>
      <ul>
        {siteConfig.footerNav[3][0].items.map((item, index) => (
          <li key={index}>
            <a href={item.href}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  </>
);
