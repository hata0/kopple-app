import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";

import { ChatCard as Props } from "../../types/ChatCard";

import { DeleteChatDialog } from "./DeleteChatDialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatJpDayOfWeek } from "@/utils/formatJpDayOfWeek";

export const ChatCard = ({ id, imageUrl, latestMessage, name, updatedAt }: Props) => {
  const formatDate = (() => {
    if (updatedAt === null) {
      return;
    } else if (isToday(updatedAt)) {
      return format(updatedAt, "H:mm");
    } else if (isYesterday(updatedAt)) {
      return "昨日";
    } else if (isThisWeek(updatedAt)) {
      return formatJpDayOfWeek(updatedAt);
    } else if (isThisYear(updatedAt)) {
      return format(updatedAt, "M/d");
    } else {
      return format(updatedAt, "yyyy/M/d");
    }
  })();

  return (
    <Card>
      <CardContent className="flex py-2">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage alt="プロフィール画像" src={imageUrl} />
            <AvatarFallback>ロード中</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full overflow-hidden">
          <div className="truncate">{name}</div>
          <div className="truncate">{latestMessage}</div>
        </div>
        <div className="ml-auto flex space-x-2">
          {updatedAt && <div className="whitespace-nowrap">{formatDate}</div>}
          <div className="flex h-full items-center">
            <DeleteChatDialog id={id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
