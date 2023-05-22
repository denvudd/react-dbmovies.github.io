import React from "react";
import SortMenu from "./SortMenu/SortMenu";
import AdditionalSortMenu from "./AdditionalSortMenu/AdditionalSortMenu";
import { setParams } from "@/redux/params/slice";
import { useAppDispatch } from "@/redux/store";
import { AdditionalSortData } from "@/redux/params/types";
import styles from "./FilterMenu.module.scss";
import { isSortParamsEmpty } from "@/utils/isSortParamsEmpty";

interface SortData {
  sortBy: string;
}

export interface AdditionalSortDataState {
  additionalSortData: AdditionalSortData;
}

const FilterMenu: React.FC = () => {
  const [sortData, setSortData] = React.useState<SortData>({
    sortBy: "",
  });
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = React.useState(true);

  const [additionalSortData, setAdditionalSortData] =
    React.useState<AdditionalSortDataState>({
      additionalSortData: {
        releaseDates: {
          date_gte: null,
          date_lte: null,
        },
        genres: null,
        language: null,
        voteAverage: {
          voteAverage_gte: null,
          voteAverage_lte: null,
        },
        voteCount: {
          voteCount_gte: null,
          voteCount_lte: null,
        },
        runtime: {
          runtime_gte: null,
          runtime_lte: null,
        },
        keywords: null,
      },
    });

  const handleSubmit = () => {
    dispatch(
      setParams({
        sortData,
        additionalSortData: additionalSortData.additionalSortData,
      })
    );
  };

  const handleSortChange = (sortBy: string) => {
    setSortData({ sortBy });
  };

  const handleAdditionalSortChange = (
    additionalSortData: AdditionalSortDataState
  ) => {
    setAdditionalSortData({
      additionalSortData: additionalSortData.additionalSortData,
    });
  };

  React.useEffect(() => {
    if (isSortParamsEmpty(additionalSortData)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [additionalSortData]);

  return (
    <div className={styles.container}>
      <SortMenu onSortChange={handleSortChange} />
      <AdditionalSortMenu onAdditionalSortChange={handleAdditionalSortChange} />
      <button
        disabled={isDisabled}
        className={styles.apply}
        onClick={handleSubmit}
        title={isDisabled ? "Оберіть хоча б один фільтр" : undefined}
      >
        <div className={styles.submit}>
          <span>Шукати</span>
        </div>
      </button>
      {!isDisabled && (
        <button
          disabled={isDisabled}
          className={styles.applyWide}
          onClick={handleSubmit}
        >
          <div className={styles.submitWide}>
            <span>Шукати</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default FilterMenu;
