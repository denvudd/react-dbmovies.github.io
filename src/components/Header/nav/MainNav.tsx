import React from "react";

import { MenuProps, Menu } from "antd";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import type { MenuItem } from "@/config/site";

import styles from "../Header.module.scss";

const MainNav = () => {
  const leftMenuItems: MenuProps["items"] = siteConfig.mainNav.map((item) => {
    const menuItem: MenuItem = {
      key: item.key,
      label: (
        <Link href={item.link} className="main-nav-link">
          {item.label}
        </Link>
      ),
    };

    if (item.children) {
      menuItem.children = item.children.map((childItem) => ({
        key: childItem.key,
        label: (
          <Link href={childItem.link} className="main-nav-link">
            {childItem.label}
          </Link>
        ),
        type: childItem.type,
      }));
    }

    return menuItem;
  });

  return (
    <Menu
      mode="horizontal"
      theme="dark"
      items={leftMenuItems}
      className={styles.leftMenu}
      style={{ minWidth: 0, flex: "auto" }}
    />
  );
};

export default MainNav;
