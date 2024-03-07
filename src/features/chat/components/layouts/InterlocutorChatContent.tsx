import { format } from "date-fns";
import { memo } from "react";

import { Message } from "../../types/ChatContents";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  imageUrl: string;
} & Message;

export const InterlocutorChatContent = memo(({ createdAt, imageUrl, message }: Props) => {
  return (
    <div className="flex">
      <Avatar>
        <AvatarImage alt="プロフィール画像" src={imageUrl} />
        <AvatarFallback>ロード中</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          `relative ml-4 mt-3 inline-block rounded-[10px] bg-gray-100 p-2 font-medium`,
          `before:absolute before:-left-2 before:bottom-[8px] before:z-[-1] before:ml-0 before:block before:h-[30px] before:w-[30px] before:rounded-[0_50px_0_50px] before:bg-gray-100 before:content-[""]`,
        )}
      >
        {message}
      </div>
      <div className="ml-2 flex items-end text-xs font-medium text-sky-400">
        {format(createdAt, "H:mm")}
      </div>
    </div>
  );
});

InterlocutorChatContent.displayName = "InterlocutorChatContent";
