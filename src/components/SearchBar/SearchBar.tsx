import React from "react";
import CloseOutlined from "@ant-design/icons/lib/icons/CloseOutlined";
import SearchOutlined from "@ant-design/icons/lib/icons/SearchOutlined";
import RiseOutlined from "@ant-design/icons/lib/icons/RiseOutlined";
import { Select } from "antd";
import { useLazyGetSearchMultiQuery } from "@/redux/api/search/slice";
import { useGetTrendingAllQuery } from "@/redux/api/trending/slice";
import { useDebounce } from "@/hooks/useDebounce";
import { useClickAway } from "ahooks";
import ReactDOM from "react-dom";
import type {
  SearchMovie,
  SearchPerson,
  SearchTV,
} from "@/redux/api/search/types/SearchMultiType";
import styles from "./SearchBar.module.scss";
import Link from "next/link";

const SearchBar: React.FC = () => {
  const [searchMulti, { data: searchData, isLoading: isSearchDataLoading }] =
    useLazyGetSearchMultiQuery();
  const { data: trendingAll, isLoading: isTrendingAllLoading } =
    useGetTrendingAllQuery({ time_window: "week", params: "language=uk-UA" });
  const [isBarActive, setIsBarActive] = React.useState(false);
  const [isIconClicked, setIsIconClicked] = React.useState(false);
  const searchBarRef = React.useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    setIsBarActive(!isBarActive);
    setIsIconClicked(true);
  };

  useClickAway(() => {
    if (!isIconClicked) {
      setIsBarActive(false);
    }

    setIsIconClicked(false);
  }, searchBarRef);

  const handlePortalClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // to prevent second click on search button
    // details: https://uk.legacy.reactjs.org/docs/portals.html#event-bubbling-through-portals
    event.stopPropagation();
  };

  const handleDebouncedSearchChange = useDebounce((value: string) => {
    searchMulti({ query: value, params: "language=uk-UA&page=1" }, true);
  }, 150);

  const handleSelect = () => {
    setIsBarActive(false);
    setIsIconClicked(false);
  };

  const SearchResultTitleTypeChecker = (
    element: SearchMovie | SearchTV | SearchPerson
  ) => {
    switch (element.media_type) {
      case "movie":
        return `${element.title} (${element.original_title}) в Фільмах`;
      case "tv":
        return `${element.name} (${element.original_name}) в Серіалах`;
      case "person":
        return `${element.name} в Людях`;
      default:
        return "Not found";
    }
  };

  const SearchResultLinkTypeChecker = (
    element: SearchMovie | SearchTV | SearchPerson
  ) => {
    switch (element.media_type) {
      case "movie":
        return `${element.id}`;
      case "tv":
        return `${element.name} (${element.original_name}) в Серіалах`;
      case "person":
        return `${element.name} в Людях`;
      default:
        return "Not found";
    }
  };

  const createPortal = () => {
    if (isBarActive) {
      return ReactDOM.createPortal(
        <div
          className={styles.bar}
          onClick={handlePortalClick}
          ref={searchBarRef}
        >
          <section className={styles.search}>
            <div className={styles.searchContainer}>
              <Select
                showSearch
                optionFilterProp="label"
                className={styles.input}
                placeholder="Пошук фільму, серіалу, персони"
                defaultActiveFirstOption={false}
                showArrow={true}
                allowClear
                filterOption={false}
                onSearch={handleDebouncedSearchChange}
                onSelect={handleSelect}
                notFoundContent={null}
                labelInValue={true}
                size="large"
                bordered={false}
                listHeight={400}
              >
                <>
                  {(!searchData || searchData.results.length === 0) && (
                    <>
                      <div className={styles.searchTitle}>
                        <h2>
                          <span>
                            <RiseOutlined style={{ fontSize: "1.2em" }} />
                          </span>
                          У тренді
                        </h2>
                      </div>
                      {trendingAll?.results.slice(0, 8).map((element) => (
                        <Select.Option
                          key={element.id}
                          value={element.id.toString()}
                          className={styles.optionWrapper}
                        >
                          <Link href={SearchResultLinkTypeChecker(element)}>
                            <div className={styles.option}>
                              <span>
                                <SearchOutlined />
                              </span>
                              <span>
                                {SearchResultTitleTypeChecker(element)}
                              </span>
                            </div>
                          </Link>
                        </Select.Option>
                      ))}
                    </>
                  )}
                  {searchData?.results.slice(0, 13).map((element) => (
                    <Select.Option
                      key={element.id}
                      value={element.id.toString()}
                      label={SearchResultTitleTypeChecker(element)}
                    >
                      <Link href={SearchResultLinkTypeChecker(element)}>
                        <div className={styles.option}>
                          <span>
                            <SearchOutlined />
                          </span>
                          <span>{SearchResultTitleTypeChecker(element)}</span>
                        </div>
                      </Link>
                    </Select.Option>
                  ))}
                </>
              </Select>
            </div>
          </section>
        </div>,
        document.body
      );
    }
    return null;
  };
  return (
    <div onClick={handleClick}>
      {!isBarActive ? (
        <SearchOutlined
          className={styles.barIcon}
          style={{ fontSize: "1.4em" }}
        />
      ) : (
        <CloseOutlined
          className={styles.barIcon + " " + styles.barIconClose}
          style={{ fontSize: "1.4em" }}
        />
      )}
      {createPortal()}
    </div>
  );
};

export default SearchBar;