import React from "react";
import { Menu, MenuProps, DatePicker, Select, Slider, Spin } from "antd";
import { default as LoadingOutlined } from "@ant-design/icons/lib/icons/LoadingOutlined";
import { useGetMovieListGenreQuery } from "@/redux/api/genres/slice";
import { useGetConfigurationLanguagesQuery } from "@/redux/api/configuration/slice";
import { useLazyGetSearchKeywordsQuery } from "@/redux/api/search/slice";
import { useDebounce } from "@/hooks/useDebounce";

import type { RangePickerProps } from "antd/es/date-picker";
import { AdditionalSortDataState } from "../FilterMenu";

import dayjs from "dayjs";
import "dayjs/locale/uk.js";
import locale from "antd/lib/date-picker/locale/uk_UA";

import styles from "./AdditionalSortMenu.module.scss";
import type { Keyword } from "@/redux/api/search/types";

interface AdditionalSortMenuProps {
  onAdditionalSortChange: (additionalSortBy: AdditionalSortDataState) => void;
}

const AdditionalSortMenu: React.FC<AdditionalSortMenuProps> = React.memo(
  ({ onAdditionalSortChange }) => {
    const [inputText, setInputText] = React.useState<string>("");
    const [isTipVisible, setIsTipVisible] = React.useState(false);
    const [selectedKeys, setSelectedKeys] = React.useState<string[] | null>(
      null
    );
    const [selectedDates, setSelectedDates] = React.useState<string[] | null>(
      null
    );
    const [selectedGenres, setSelectedGenres] = React.useState<string[] | null>(
      []
    );
    const [selectedLanguage, setSelectedLanguage] = React.useState<
      string | null
    >(null);
    const [selectedVoteAverage, setSelectedVoteAverage] = React.useState<
      number[] | null
    >(null);
    const [selectedVoteCount, setSelectedVoteCount] = React.useState<
      number[] | null
    >(null);
    const [selectedRuntime, setSelectedRuntime] = React.useState<
      number[] | null
    >(null);
    const [keywordOptions, setKeywordOptions] = React.useState<Keyword[]>([]);
    const { data: genres, isLoading: isGenresLoading } =
      useGetMovieListGenreQuery("&language=uk-UA");
    const { data: languages, isLoading: isLanguagesLoading } =
      useGetConfigurationLanguagesQuery(null);
    const [fetchKeywords, { isLoading: isKeywordsLoading }] =
      useLazyGetSearchKeywordsQuery();
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

    const handleDateChange: RangePickerProps["onChange"] = (
      values: RangePickerProps["value"],
      formatString: [string, string]
    ): void | undefined => {
      setSelectedDates(formatString);
    };

    const handleLanguageChange = (lang: string) => {
      setSelectedLanguage(lang);
    };

    const handleGenreChange = (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      key: string
    ) => {
      event.preventDefault();

      if (selectedGenres === null) {
        setSelectedGenres([key]);
        return;
      }

      const genreIndex = selectedGenres.indexOf(key);

      if (genreIndex === -1) {
        setSelectedGenres([...selectedGenres, key]);
      } else {
        const updatedGenres = [...selectedGenres];
        updatedGenres.splice(genreIndex, 1);
        setSelectedGenres(updatedGenres);
      }
    };

    const handleAverageVote = React.useCallback((value: [number, number]) => {
      setSelectedVoteAverage(value);
    }, []);

    const handleAverageVoteCount = React.useCallback(
      (value: [number, number]) => {
        setSelectedVoteCount(value);
      },
      []
    );

    const handleRuntime = React.useCallback((value: [number, number]) => {
      setSelectedRuntime(value);
    }, []);

    const handleDebouncedSearchChange = useDebounce((value: string) => {
      setInputText(value || "");
    }, 300);

    const handleSelectChange = React.useCallback(
      (selectedValues: string[]) => {
        const selectedFilter = keywordOptions
          .filter((keyword) => selectedValues.includes(keyword.name))
          .map((keyword) => keyword.id.toString());
        setSelectedKeys(selectedFilter);
      },
      [keywordOptions]
    );

    React.useEffect(() => {
      // if search is not empty
      if (inputText.trim() !== "") {
        fetchKeywords(`${inputText}`, true)
          .unwrap()
          .then((result) => {
            if (result && result.length !== 0) {
              setKeywordOptions(result);
            }
          })
          .finally(() => {});
      } else {
        setKeywordOptions([]);
      }
    }, [inputText]);

    React.useEffect(() => {
      setAdditionalSortData({
        additionalSortData: {
          releaseDates: {
            date_gte: selectedDates && selectedDates[0],
            date_lte: selectedDates && selectedDates[1],
          },
          genres: selectedGenres,
          language: selectedLanguage,
          voteAverage: {
            voteAverage_gte:
              selectedVoteAverage && selectedVoteAverage[0].toString(),
            voteAverage_lte:
              selectedVoteAverage && selectedVoteAverage[1].toString(),
          },
          voteCount: {
            voteCount_gte: selectedVoteCount && selectedVoteCount[0].toString(),
            voteCount_lte: selectedVoteCount && selectedVoteCount[1].toString(),
          },
          runtime: {
            runtime_gte: selectedRuntime && selectedRuntime[0].toString(),
            runtime_lte: selectedRuntime && selectedRuntime[1].toString(),
          },
          keywords: selectedKeys,
        },
      });
    }, [
      selectedGenres,
      selectedDates,
      selectedLanguage,
      selectedVoteAverage,
      selectedVoteCount,
      selectedRuntime,
      selectedKeys,
    ]);

    React.useEffect(() => {
      onAdditionalSortChange(additionalSortData);
    }, [additionalSortData]);

    const menuItems: MenuProps["items"] = [
      {
        key: "filters",
        label: "Фільтри",
        children: [
          {
            key: "dateRelease",
            label: "Дата релізу",
            type: "group",
            children: [
              {
                key: "datepicker",
                label: (
                  <DatePicker.RangePicker
                    onChange={handleDateChange}
                    placeholder={["Початок", "Кінець"]}
                    presets={[
                      {
                        label: "Останні 7 днів",
                        value: [dayjs().add(-7, "d"), dayjs()],
                      },
                      {
                        label: "Останні 14 днів",
                        value: [dayjs().add(-14, "d"), dayjs()],
                      },
                      {
                        label: "Останній 30 днів",
                        value: [dayjs().add(-30, "d"), dayjs()],
                      },
                      {
                        label: "Останній 90 днів",
                        value: [dayjs().add(-90, "d"), dayjs()],
                      },
                    ]}
                    locale={locale}
                  />
                ),
                type: "group",
              },
            ],
          },
          {
            key: "genres",
            label: "Жанри",
            type: "group",
            children: [
              {
                key: "genrePicker",
                label: (
                  <ul className={styles.genresList}>
                    {isGenresLoading && (
                      <div className={styles.loadingWrapper}>
                        <Spin
                          indicator={
                            <LoadingOutlined style={{ fontSize: 24 }} spin />
                          }
                        />
                      </div>
                    )}
                    {!isGenresLoading &&
                      genres &&
                      genres.length !== 0 &&
                      genres.map((genre) => {
                        const isSelected = selectedGenres?.includes(
                          genre.id.toString()
                        );
                        const genreClassName = isSelected
                          ? styles.selectedGenre
                          : styles.genre;

                        return (
                          <li key={genre.id} className={genreClassName}>
                            <a
                              href=""
                              onClick={(event) =>
                                handleGenreChange(event, genre.id.toString())
                              }
                            >
                              {genre.name}
                            </a>
                          </li>
                        );
                      })}
                  </ul>
                ),
                type: "group",
              },
            ],
          },
          {
            key: "languages",
            label: "Мова",
            type: "group",
            children: [
              {
                key: "languagePicker",
                label: (
                  <Select
                    placeholder="Обрати мову"
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    style={{ width: "100%" }}
                    onChange={handleLanguageChange}
                    loading={isLanguagesLoading}
                    options={
                      !isLanguagesLoading && languages && languages.length !== 0
                        ? languages.map((language) => ({
                            value: language.iso_639_1,
                            label: language.english_name,
                          }))
                        : undefined
                    }
                  />
                ),
                type: "group",
              },
            ],
          },
          {
            key: "voteAverage",
            label: "Оцінка користувачів",
            type: "group",
            children: [
              {
                key: "voteAveragePicker",
                label: (
                  <Slider
                    className={styles.slider}
                    range
                    defaultValue={[0, 10]}
                    marks={{
                      0: <span className={styles.mark}>0</span>,
                      5: <span className={styles.mark}>5</span>,
                      10: <span className={styles.mark}>10</span>,
                    }}
                    min={0}
                    max={10}
                    railStyle={{ backgroundColor: "#fff" }}
                    tooltip={{
                      formatter: (value) => <span>Оцінка {value}</span>,
                      placement: "top",
                    }}
                    onChange={handleAverageVote}
                  />
                ),
                type: "group",
              },
            ],
          },
          {
            key: "voteCount",
            label: "Мінімальна кількість голосів користувачів",
            type: "group",
            children: [
              {
                key: "voteCountPicker",
                label: (
                  <Slider
                    className={styles.slider}
                    range
                    defaultValue={[0, 500]}
                    marks={{
                      0: <span className={styles.mark}>0</span>,
                      100: <span className={styles.mark}>100</span>,
                      200: <span className={styles.mark}>200</span>,
                      300: <span className={styles.mark}>300</span>,
                      400: <span className={styles.mark}>400</span>,
                      500: <span className={styles.mark}>500</span>,
                    }}
                    step={50}
                    min={0}
                    max={500}
                    railStyle={{ backgroundColor: "#fff" }}
                    tooltip={{
                      formatter: (value) => <span>Голосів {value}</span>,
                      placement: "top",
                    }}
                    onChange={handleAverageVoteCount}
                  />
                ),
                type: "group",
              },
            ],
          },
          {
            key: "runtime",
            label: "Тривалість",
            type: "group",
            children: [
              {
                key: "runtimePicker",
                label: (
                  <Slider
                    className={styles.slider}
                    range
                    defaultValue={[0, 400]}
                    marks={{
                      0: <span className={styles.mark}>0</span>,
                      120: <span className={styles.mark}>120</span>,
                      240: <span className={styles.mark}>240</span>,
                      360: <span className={styles.mark}>360</span>,
                    }}
                    step={15}
                    min={0}
                    max={400}
                    railStyle={{ backgroundColor: "#fff" }}
                    tooltip={{
                      formatter: (value) => <span>Тривалість {value}</span>,
                      placement: "top",
                    }}
                    onChange={handleRuntime}
                  />
                ),
                type: "group",
              },
            ],
          },
          {
            key: "keywords",
            label: "Ключові слова",
            type: "group",
            children: [
              {
                key: "keywordsPicker",
                label: (
                  <>
                    <Select
                      placeholder="Фільтрувати за ключовими словами"
                      mode="tags"
                      showSearch
                      filterOption={(input, option) =>
                        (option?.label ?? "").includes(input)
                      }
                      filterSort={(optionA, optionB) =>
                        (optionA?.label ?? "")
                          .toLowerCase()
                          .localeCompare((optionB?.label ?? "").toLowerCase())
                      }
                      style={{ width: "100%" }}
                      onSearch={handleDebouncedSearchChange}
                      loading={isKeywordsLoading}
                      options={keywordOptions.map((keyword) => ({
                        value: keyword.name,
                        label: keyword.name,
                      }))}
                      onChange={handleSelectChange}
                      showArrow={false}
                      notFoundContent={null}
                      tokenSeparators={[","]}
                      allowClear
                      onFocus={() => setIsTipVisible(true)}
                      onBlur={() => setIsTipVisible(false)}
                    />
                    {isTipVisible && (
                      <span className={styles.keywordsWarn}>
                        *будь ласка, оберайте варіанти із списку
                      </span>
                    )}
                  </>
                ),
                type: "group",
              },
            ],
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
          defaultSelectedKeys={["selectComponent"]}
          defaultOpenKeys={["filters"]}
          className={styles.menu}
        />
      </form>
    );
  }
);

export default AdditionalSortMenu;
