import { siteConfig } from "@/config/site";
import { MenuProps } from "antd";
import { MenuItem } from "@/config/site";
import Link from "next/link";

export const mainNavMenu: MenuProps["items"] = siteConfig.mainNav.map((item) => {
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