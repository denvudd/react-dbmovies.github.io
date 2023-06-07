import React from "react";
import Link from "next/link";
import styles from "./ProfileTabs.module.scss";

interface Tab {
  label: string;
  link: string;
}

interface ProfileTabsProps {
  activeTabIndex: number;
  tabs: Tab[];
}

const ProfileTabs: React.FC<ProfileTabsProps> = ({ activeTabIndex, tabs }) => {
  const getTabClassName = (tabIndex: number) => {
    if (tabIndex === activeTabIndex) {
      return `${styles.tab} ${styles.tabActive}`;
    }
    return styles.tab;
  };
  return (
    <div className={styles.tabs}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabsInner}>
          <ul className={styles.tabsList}>
            {tabs.map((tab, index) => (
              <li key={index} className={getTabClassName(index)}>
                <Link href={tab.link} className={styles.tabLink}>
                  {tab.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileTabs;
