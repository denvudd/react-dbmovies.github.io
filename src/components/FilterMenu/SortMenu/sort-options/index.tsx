import { SortValue } from "@/redux/params/types/types";

export const sortOptions = [
  { value: SortValue.PopularityDesc, label: "Популярне" },
  { value: SortValue.PopularityAsc, label: "Непопулярні" },
  { value: SortValue.VoteAverageDesc, label: "Рейтинг високий" },
  { value: SortValue.VoteAverageAsc, label: "Рейтинг низький" },
  { value: SortValue.ReleaseDateDesc, label: "Реліз свіжий" },
  { value: SortValue.ReleaseDateAsc, label: "Реліз давній" },
  { value: SortValue.RevenueDesc, label: "Бюджет високий" },
  { value: SortValue.RevenueAsc, label: "Бюджет низький" },
];
