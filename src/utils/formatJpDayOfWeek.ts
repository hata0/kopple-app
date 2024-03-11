import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";

export const formatJpDayOfWeek = (date: Date) => {
  if (isSunday(date)) {
    return "日曜日";
  } else if (isMonday(date)) {
    return "月曜日";
  } else if (isTuesday(date)) {
    return "火曜日";
  } else if (isWednesday(date)) {
    return "水曜日";
  } else if (isThursday(date)) {
    return "木曜日";
  } else if (isFriday(date)) {
    return "金曜日";
  } else if (isSaturday(date)) {
    return "土曜日";
  } else {
    throw new Error("曜日ではないデータが入っています。");
  }
};
