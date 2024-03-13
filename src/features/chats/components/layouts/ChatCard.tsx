import { format, isThisWeek, isThisYear, isToday, isYesterday } from "date-fns";
import { useRouter } from "next/router";
import { memo } from "react";

import { ChatCard as Props } from "../../types/ChatCard";

import { DeleteChatDialog } from "./DeleteChatDialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { formatJpDayOfWeek } from "@/utils/formatJpDayOfWeek";

const formatDate = (date: Date | null) => {
  if (date === null) {
    return;
  } else if (isToday(date)) {
    return format(date, "H:mm");
  } else if (isYesterday(date)) {
    return "昨日";
  } else if (isThisWeek(date)) {
    return formatJpDayOfWeek(date);
  } else if (isThisYear(date)) {
    return format(date, "M/d");
  } else {
    return format(date, "yyyy/M/d");
  }
};

export const ChatCard = memo(({ id, imageUrl, latestMessage, name, updatedAt }: Props) => {
  const router = useRouter();

  return (
    <div
      className="w-full"
      onClick={() => void router.push(`/chat/${id}`)}
      role="button"
      tabIndex={0}
    >
      <Card>
        <CardContent className="flex py-2 hover:bg-accent">
          <div className="flex items-center justify-center">
            <Avatar>
              <AvatarImage alt="プロフィール画像" src={imageUrl} />
              <AvatarFallback aria-label={name} className="bg-sky-200">
                {name.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-4 w-full overflow-hidden">
            <div className="truncate">{name}</div>
            <div className="truncate">{latestMessage}</div>
          </div>
          <div className="ml-auto flex space-x-2">
            {updatedAt && <div className="whitespace-nowrap">{formatDate(updatedAt)}</div>}
            <div className="flex h-full items-center" onClick={(e) => e.stopPropagation()}>
              <DeleteChatDialog id={id} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

ChatCard.displayName = "ChatCard";
