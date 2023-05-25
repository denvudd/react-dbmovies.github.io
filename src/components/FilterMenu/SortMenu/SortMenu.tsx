import React from "react";
import { MenuProps, Select, Menu } from "antd";
import styles from "./SortMenu.module.scss";
import { SortValue } from "@/redux/params/types/types";

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
                options={[
                  { value: SortValue.PopularityDesc, label: "Популярне" },
                  { value: SortValue.PopularityAsc, label: "Непопулярні" },
                  { value: SortValue.VoteAverageDesc, label: "Рейтинг високий" },
                  { value: SortValue.VoteAverageAsc, label: "Рейтинг низький" },
                  { value: SortValue.ReleaseDateDesc, label: "Реліз свіжий" },
                  { value: SortValue.ReleaseDateAsc, label: "Реліз давній" },
                  { value: SortValue.RevenueDesc, label: "Бюджет високий" },
                  { value: SortValue.RevenueAsc, label: "Бюджет низький" },
                ]}
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
