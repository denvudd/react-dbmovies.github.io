import React from "react";
import { useAppDispatch } from "@/redux/store";

import SortMenu from "./SortMenu/SortMenu";
import AdditionalSortMenu from "./AdditionalSortMenu/AdditionalSortMenu";

import { setParams } from "@/redux/params/slice";
import { isSortParamsEmpty } from "@/utils/isSortParamsEmpty";
import {
  AdditionalSortData,
  SortData,
  SortValue,
  ProvidersSortData,
} from "@/redux/params/types/types";

import styles from "./FilterMenu.module.scss";
import ProvidersSortMenu from "./ProvidersSortMenu/ProviderSortMenu";

interface FilterMenuProps {
  mediaType: "movies" | "tv";
}
export interface AdditionalSortDataState {
  additionalSortData: AdditionalSortData;
}

const FilterMenu: React.FC<FilterMenuProps> = React.memo(({ mediaType }) => {
  const [sortData, setSortData] = React.useState<SortData>({
    sortBy: SortValue.None,
  });
  const [providersSortData, setProvidersSortData] =
    React.useState<ProvidersSortData>({
      withWatchProviders: null,
    });
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
  const dispatch = useAppDispatch();
  const [isDisabled, setIsDisabled] = React.useState(true);

  const handleSubmit = () => {
    dispatch(
      setParams({
        sortData,
        providersSortData,
        additionalSortData: additionalSortData.additionalSortData,
      })
    );
  };

  const handleSortChange = (sortBy: SortValue) => {
    setSortData({ sortBy });
  };

  const handleProvidersSortChange = (providers: string[] | null) => {
    setProvidersSortData({ withWatchProviders: providers });
  };

  const handleAdditionalSortChange = (
    additionalSortData: AdditionalSortDataState
  ) => {
    setAdditionalSortData({
      additionalSortData: additionalSortData.additionalSortData,
    });
  };

  React.useEffect(() => {
    const isAllParamsEmpty =
      isSortParamsEmpty(additionalSortData) &&
      isSortParamsEmpty(sortData) &&
      isSortParamsEmpty(providersSortData);

    if (isAllParamsEmpty) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [additionalSortData, sortData, providersSortData]);

  return (
    <div className={styles.container}>
      <SortMenu onSortChange={handleSortChange} />
      <ProvidersSortMenu
        onProvidersSortChange={handleProvidersSortChange}
        mediaType={mediaType}
      />
      <AdditionalSortMenu
        onAdditionalSortChange={handleAdditionalSortChange}
        mediaType={mediaType}
      />
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
});

export default FilterMenu;
