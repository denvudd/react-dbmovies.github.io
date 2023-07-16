import { getLastSpecificDays } from "@/utils/getLastSpecificDays";
import { getSpecificYear } from "@/utils/getSpecificYear";
import type { Dayjs } from "dayjs";

export const rangePicker: { label: string; value: [Dayjs, Dayjs]; }[] = [
  {
    label: "Останні 7 днів",
    value: getLastSpecificDays(-7),
  },
  {
    label: "Останні 14 днів",
    value: getLastSpecificDays(-14),
  },
  {
    label: "Останні 30 днів",
    value: getLastSpecificDays(-30),
  },
  {
    label: "Останні 90 днів",
    value: getLastSpecificDays(-90),
  },
  {
    label: "За 2022 рік",
    value: [
      getSpecificYear(2022)[0],
      getSpecificYear(2022)[1],
    ],
  },
  {
    label: "За 2021 рік",
    value: [
      getSpecificYear(2021)[0],
      getSpecificYear(2021)[1],
    ],
  },
  {
    label: "За 2020 рік",
    value: [
      getSpecificYear(2020)[0],
      getSpecificYear(2020)[1],
    ],
  },
  {
    label: "За 2019 рік",
    value: [
      getSpecificYear(2019)[0],
      getSpecificYear(2019)[1],
    ],
  },
  {
    label: "За 2018 рік",
    value: [
      getSpecificYear(2018)[0],
      getSpecificYear(2018)[1],
    ],
  },
];