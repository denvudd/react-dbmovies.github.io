import React from "react";
import { Menu, MenuProps, Select } from "antd";
import styles from "./FilterMenu.module.scss";
import SortMenu from "./SortMenu/SortMenu";
import AdditionalSortMenu from "./AdditionalSortMenu/AdditionalSortMenu";
import { useDispatch } from "react-redux";
import { setParams } from "@/redux/params/slice";

interface SortData {
  sortBy: string;
}

interface AdditionalSortData {
  additionalSortBy: string;
}

const FilterMenu = () => {
  const dispatch = useDispatch();
  const [sortData, setSortData] = React.useState<SortData>({
    sortBy: '',
  });

  const [additionalSortData, setAdditionalSortData] = React.useState<AdditionalSortData>({
    additionalSortBy: '',
  });

  const handleSubmit = () => {
    // console.log('Sort Data:', sortData);
    // console.log('Additional Sort Data:', additionalSortData);
    dispatch(setParams({sortData, additionalSortData}));
  };

  const handleSortChange = (sortBy: string) => {
    setSortData({ sortBy });
  };

  const handleAdditionalSortChange = (additionalSortBy: string) => {
    setAdditionalSortData({ additionalSortBy });
  };


  return (
    <div className={styles.container}>
      <SortMenu onSortChange={handleSortChange}/>
      <AdditionalSortMenu onAdditionalSortChange={handleAdditionalSortChange}/>
      <button type="submit" onClick={handleSubmit}>123</button>
    </div>
  );
};

export default FilterMenu;
