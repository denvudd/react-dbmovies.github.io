import React from "react";
import { formatFirstLetterToUppercase } from "@/utils/formatFirstLetterToUppercase";
import Link from "next/link";
import styles from "./ProfileListGrid.module.scss";
import type { ListItem } from "@/redux/api/account/types";

interface UserListGridProps {
  lists: ListItem[];
}

const ProfileListGrid: React.FC<UserListGridProps> = ({ lists }) => {
  return (
    <>
      {lists.length !== 0 &&
        lists.map((list) => (
          <div key={list.id} className={styles.card}>
            <div className={styles.details}>
              <h2>
                <Link href={`/lists/${list.id}`}>{list.name}</Link>
              </h2>
              <div className={styles.meta}>
                <span>{list.item_count} елементів</span>
                <span>{formatFirstLetterToUppercase(list.list_type)}</span>
              </div>
              <p>Мова: {list.iso_639_1.toUpperCase()}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default ProfileListGrid;
