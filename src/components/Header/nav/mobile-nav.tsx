import { siteConfig } from "@/config/site";
import Link from "next/link";
import type { MenuProps } from "antd";
import type { MenuItem } from "@/config/site";

export const mobileNavMenu: MenuProps["items"] = siteConfig.mobileNav.map((item) => {
  const menuItem: MenuItem = {
    key: item.key,
    label: (
      <Link href={item.link} className={`mobile-nav-link ${item.secondary ? 'secondary-nav-link' : ''}`}>
        {item.label}
      </Link>
    ),
  };

  if (item.children) {
    menuItem.children = item.children.map((childItem) => ({
      key: childItem.key,
      label: (
        <Link href={childItem.link} className={`mobile-nav-link secondary-nav-link--sub`}>
          {childItem.label}
        </Link>
      ),
      type: childItem.type,
    }));
  }

  return menuItem;
});