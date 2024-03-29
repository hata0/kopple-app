import { format, isEqual, isThisYear, isToday, isYesterday } from "date-fns";

import { Badge } from "@/components/shadcn/ui/badge";
import { formatAcronymJpDayOfWeek } from "@/utils/formatAcronymJpDayOfWeek";

type Props = {
  date: Date;
};

export const DateBadge = ({ date }: Props) => {
  let prevDate: Date | null = null;
  let formattedDate: string;

  if (prevDate && isEqual(date, prevDate)) {
    prevDate = date;
    return;
  }

  if (isToday(date)) {
    formattedDate = "今日";
  } else if (isYesterday(date)) {
    formattedDate = "昨日";
  } else if (isThisYear(date)) {
    formattedDate = `${format(date, "M/d")}(${formatAcronymJpDayOfWeek(date)})`;
  } else {
    formattedDate = `${format(date, "yyyy/M/d")}(${formatAcronymJpDayOfWeek(date)})`;
  }

  prevDate = date;
  return (
    <div className="flex w-full items-center justify-center">
      <Badge className="hover:bg-primary">{formattedDate}</Badge>
    </div>
  );
};
