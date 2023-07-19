import React from "react";
import { siteConfig } from "@/config/site";

import { Drawer, Menu, MenuProps } from "antd";
import Link from "next/link";
import type { MenuItem } from "@/config/site";

import styles from "../Header.module.scss";

interface MobileNavMenuProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const MobileMenuNav: React.FC<MobileNavMenuProps> = ({
  visible,
  setVisible,
}) => {
  const showDrawer = () => {
    setVisible(!visible);
  };

  const mobileMenuItems: MenuProps["items"] = siteConfig.mobileNav.map(
    (item) => {
      const menuItem: MenuItem = {
        key: item.key,
        label: (
          <Link
            href={item.link}
            className={`mobile-nav-link ${
              item.secondary ? "secondary-nav-link" : ""
            }`}
            onClick={() => setVisible(false)}
          >
            {item.label}
          </Link>
        ),
      };

      if (item.children) {
        menuItem.children = item.children.map((childItem) => ({
          key: childItem.key,
          label: (
            <Link
              href={childItem.link}
              className={`mobile-nav-link secondary-nav-link--sub`}
              onClick={() => setVisible(false)}
            >
              {childItem.label}
            </Link>
          ),
          type: childItem.type,
        }));
      }

      return menuItem;
    }
  );
  return (
    <Drawer
      title={
        <Link href={"/"} className={styles.logo}>
          TMDB
        </Link>
      }
      placement="left"
      closable={true}
      onClose={showDrawer}
      open={visible}
      style={{ zIndex: 99999 }}
      className={styles.mobileDrawer}
      width={"calc(100vw - 40px)"}
      destroyOnClose={true}
    >
      <Menu
        mode="inline"
        theme="dark"
        items={mobileMenuItems}
        style={{ minWidth: 0, flex: "auto" }}
      />
    </Drawer>
  );
};

export default MobileMenuNav;
