import React from "react";
import {
  Menu,
  MenuProps,
  DatePicker,
  Select,
  Slider,
} from "antd";
import { Dayjs } from "dayjs";
import { useGetMovieListGenreQuery } from "@/redux/api/genres/slice";
import styles from "./AdditionalSortMenu.module.scss";
import { useGetConfigurationLanguagesQuery } from "@/redux/api/configuration/slice";
import { useLazyGetSearchKeywordsQuery } from "@/redux/api/search/slice";
import { Keyword } from "@/redux/api/search/types/SearchKeywordType";
import type { RangePickerProps } from 'antd/es/date-picker';

interface AdditionalSortMenuProps {
  onAdditionalSortChange: (additionalSortBy: string) => void;
}

const AdditionalSortMenu: React.FC<AdditionalSortMenuProps> = ({
  onAdditionalSortChange,
}) => {
  const [selectedDates, setSelectedDates] = React.useState<string[]>([]);
  const [inputText, setInputText] = React.useState<string>("");
  const [selectedKeys, setSelectedKeys] = React.useState<string[] | null>([]);
  const [keywordOptions, setKeywordOptions] = React.useState<Keyword[]>([]);
  const { data: genres, isLoading: isGenresLoading } =
    useGetMovieListGenreQuery("&language=uk-UA");
  const { data: languages, isLoading: isLanguagesLoading } =
    useGetConfigurationLanguagesQuery({});
  const [fetchKeywords, { data: keywords, isLoading: isKeywordsLoading }] =
    useLazyGetSearchKeywordsQuery();
  const formattedLanguageArray =
    !isLanguagesLoading &&
    languages &&
    languages.length !== 0 &&
    languages.map((language) => ({
      value: language.iso_639_1,
      label: language.english_name,
    }));

  const handleDateChange: RangePickerProps["onChange"] = (
    values: RangePickerProps['value'],
    formatString: [string, string]
  ): void | undefined => {
    console.log(formatString);
  };

  const handleLanguageChange = (key: string) => {
    const sortBy = key;
    console.log(sortBy);
  };

  // console.log(inputText);

  const handleGenreChange = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    key: number
  ) => {
    event.preventDefault();
  };

  const handleAverageVoteHandle = (value: [number, number]): void => {};

  const handleSearchChange = (value: string): void => {
    setInputText(value || ""); // Обновить введенный текст
  };

  const handleSelectChange = (selectedValues: string[]) => {
    const selectedFilter = keywordOptions.filter((keyword) =>
      selectedValues.includes(keyword.name)
    ).map(keyword => keyword.id.toString());
    console.log(selectedFilter);
  };

  const handleAdditionalSortChange = (key: string) => {
    const additionalSortBy = key;
    onAdditionalSortChange(additionalSortBy);
  };

  React.useEffect(() => {
    // Выполнить запрос только если введенный текст не пустой
    if (inputText.trim() !== "") {
      fetchKeywords(`${inputText}`, true)
        .unwrap()
        .then((result) => {
          if (result && result.length > 0) {
            setKeywordOptions(result);
          }
        })
        .finally(() => {});
    } else {
      setKeywordOptions([]); // Сбросить список ключевых слов, если введенный текст пустой
    }
  }, [inputText]);

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
                // changed:
                // onChange?: (values: Dayjs | null, formatString: string) => void; AND onChange?: (value: DateType | null, dateString: string) => void;
                // on
                // onChange?: (values: RangeValue<DateType>, formatString: [string, string]) => void;
                // in DatePickerProps and RangePickerSharedProp because of bug type
                // links issue:
                // #1 https://stackoverflow.com/questions/64328461/type-definition-of-rangepicker-onchange-date-paramater,
                // # https://github.com/ant-design/ant-design/issues/41355
                <DatePicker.RangePicker
                  onChange={handleDateChange}
                  size="small"
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
                  {!isGenresLoading &&
                    genres &&
                    genres.length !== 0 &&
                    genres.map((genre) => (
                      <li key={genre.id} className={styles.genre}>
                        <a
                          href=""
                          onClick={(event) =>
                            handleGenreChange(event, genre.id)
                          }
                        >
                          {genre.name}
                        </a>
                      </li>
                    ))}
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
                    formattedLanguageArray ? formattedLanguageArray : undefined
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
                  onChange={handleAverageVoteHandle}
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
                  onChange={handleAverageVoteHandle}
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
                  onChange={handleAverageVoteHandle}
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
                    onSearch={handleSearchChange}
                    loading={isKeywordsLoading}
                    options={keywordOptions.map((keyword) => ({
                      value: keyword.name,
                      label: keyword.name,
                    }))}
                    onChange={handleSelectChange}
                    showArrow={false}
                    notFoundContent={null}
                  />
                  <span className={styles.keywordsWarn}>
                    *будь ласка, оберайте варіанти із списку
                  </span>
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
};

export default AdditionalSortMenu;
