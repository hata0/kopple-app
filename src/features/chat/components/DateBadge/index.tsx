import { format, isThisYear, isToday, isYesterday } from "date-fns";
import { ja } from "date-fns/locale";

import { Badge } from "@/components/shadcn/ui/badge";

type Props = {
  date: Date;
};

export const DateBadge = ({ date }: Props) => {
  let formattedDate: string;

  if (isToday(date)) {
    formattedDate = "今日";
  } else if (isYesterday(date)) {
    formattedDate = "昨日";
  } else if (isThisYear(date)) {
    formattedDate = format(date, "M/d(E)", { locale: ja });
  } else {
    formattedDate = format(date, "yyyy/M/d(E)", { locale: ja });
  }

  return (
    <div className="flex w-full items-center justify-center">
      <Badge className="hover:bg-primary">{formattedDate}</Badge>
    </div>
  );
};
