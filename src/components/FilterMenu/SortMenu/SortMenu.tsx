import React from "react";
import { MenuProps, Select, Menu } from "antd";
import { SortValue } from "@/redux/params/types/types";

import styles from "./SortMenu.module.scss";
import { sortOptions } from "./sort-options";
interface SortMenuProps {
  onSortChange: (sortBy: SortValue) => void;
}

const SortMenu: React.FC<SortMenuProps> = React.memo(({ onSortChange }) => {
  const handleSortChange = (key: SortValue) => {
    onSortChange(key);
  };

  const menuItems: MenuProps["items"] = [
    {
      key: "sub1",
      label: "Сортування",
      children: [
        {
          key: "1",
          label: (
            <div className={styles.menu}>
              <h3>Сортувати результати за</h3>
              <Select
                defaultValue={SortValue.PopularityDesc}
                style={{ width: "100%" }}
                onChange={handleSortChange}
                options={sortOptions.map((option) => {
                  return {
                    value: option.value,
                    label: option.label,
                  };
                })}
              />
            </div>
          ),
          type: "group",
        },
      ],
    },
  ];

  return (
    <form>
      <Menu
        mode="inline"
        style={{ height: "100%" }}
        theme="dark"
        items={menuItems}
      />
    </form>
  );
});

export default SortMenu;
