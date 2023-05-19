import React from "react";
import styles from "./FilterMenu.module.scss";
import SortMenu from "./SortMenu/SortMenu";
import AdditionalSortMenu from "./AdditionalSortMenu/AdditionalSortMenu";
import { setParams } from "@/redux/params/slice";
import { useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import { selectParams } from "@/redux/params/selectors";

interface SortData {
  sortBy: string;
}

interface AdditionalSortData {
  additionalSortBy: string;
}

const FilterMenu = () => {
  const [sortData, setSortData] = React.useState<SortData>({
    sortBy: "",
  });
  const [isButtonVisible, setIsButtonVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const queryParams = useSelector(selectParams);

  const [additionalSortData, setAdditionalSortData] =
    React.useState<AdditionalSortData>({
      additionalSortBy: "",
    });

  React.useEffect(() => {
    if (Object.values(queryParams).length === 0) {
      setIsButtonVisible(false);
    } else {
      setIsButtonVisible(true);
    }
  }, [queryParams]);

  const handleSubmit = () => {
    // console.log('Sort Data:', sortData);
    // console.log('Additional Sort Data:', additionalSortData);
    dispatch(setParams({ sortData, additionalSortData }));
  };

  const handleSortChange = (sortBy: string) => {
    setSortData({ sortBy });
  };

  const handleAdditionalSortChange = (additionalSortBy: string) => {
    setAdditionalSortData({ additionalSortBy });
  };

  return (
    <div className={styles.container}>
      <SortMenu onSortChange={handleSortChange} />
      <AdditionalSortMenu onAdditionalSortChange={handleAdditionalSortChange} />
      {isButtonVisible && (
        <div className={styles.apply} onClick={handleSubmit}>
          <div className={styles.submit}>
            <span>Шукати</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
