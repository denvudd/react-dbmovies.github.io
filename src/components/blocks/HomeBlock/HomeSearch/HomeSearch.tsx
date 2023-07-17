import React from "react";
import { useRouter } from "next/router";
import { useIsMobile } from "@/hooks/useIsMobile";

import Link from "next/link";

import styles from "./HomeSearch.module.scss";


const HomeSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const router = useRouter();
  const isMobile = useIsMobile();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      router.push({
        pathname: "/search",
        query: { query: searchQuery }
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} action="/search">
        <label>
          <input
            className={styles.search}
            type="text"
            tabIndex={1}
            placeholder={!isMobile ? "Пошук фільму, серіалу, персони..." : "Пошук..."}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
        </label>
        <Link
          href={{ pathname: "/search", query: { query: searchQuery } }}
          className={styles.submit}
        >
          Пошук
        </Link>
      </form>
    </div>
  );
};

export default HomeSearch;
