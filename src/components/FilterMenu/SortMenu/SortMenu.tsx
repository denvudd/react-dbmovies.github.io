import React from "react";
import { MenuProps, Select, Menu } from "antd";
import styles from "./SortMenu.module.scss";

interface SortMenuProps {
  onSortChange: (sortBy: string) => void;
}

const SortMenu: React.FC<SortMenuProps> = ({ onSortChange }) => {
  const handleSortChange = (key: string) => {
    const sortBy = key;
    onSortChange(sortBy);
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
                defaultValue="popularity.desc"
                style={{ width: "100%" }}
                onChange={handleSortChange}
                options={[
                  { value: "popularity.desc", label: "Популярне" },
                  { value: "popularity.asc", label: "Непопулярні" },
                  { value: "vote_average.desc", label: "Рейтинг високий" },
                  { value: "vote_average.asc", label: "Рейтинг низький" },
                  { value: "primary_release_date.desc", label: "Реліз свіжий" },
                  { value: "primary_release_date.asc", label: "Реліз давній" },
                  { value: "revenue.desc", label: "Бюджет високий" },
                  { value: "revenue.asc", label: "Бюджет низький" },
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
};

export default SortMenu;
