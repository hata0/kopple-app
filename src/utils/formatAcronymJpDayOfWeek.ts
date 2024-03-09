import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";

export const formatAcronymJpDayOfWeek = (date: Date) => {
  if (isSunday(date)) {
    return "日";
  } else if (isMonday(date)) {
    return "月";
  } else if (isTuesday(date)) {
    return "火";
  } else if (isWednesday(date)) {
    return "水";
  } else if (isThursday(date)) {
    return "木";
  } else if (isFriday(date)) {
    return "金";
  } else if (isSaturday(date)) {
    return "土";
  } else {
    throw new Error("曜日ではないデータが入っています。");
  }
};
