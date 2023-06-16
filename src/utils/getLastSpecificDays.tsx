import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

type EventValue<Dayjs> = Dayjs;

export const getLastSpecificDays = (lastDays: number): [EventValue<Dayjs>, EventValue<Dayjs>] => {
  return [dayjs().add(lastDays, "d"), dayjs()];
};
