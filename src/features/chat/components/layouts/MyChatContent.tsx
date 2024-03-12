import { format } from "date-fns";
import { memo } from "react";

import { Message } from "../../types/Message";

import { cn } from "@/lib/utils";

export const MyChatContent = memo(({ createdAt, message }: Message) => {
  return (
    <div className="flex w-full justify-end">
      <div className="mr-2 flex items-end text-xs font-medium text-sky-400">
        {format(createdAt, "H:mm")}
      </div>
      <div
        className={cn(
          `relative mr-5 inline-block rounded-[10px] bg-sky-400 p-2`,
          `before:absolute before:bottom-[8px] before:right-[-4px] before:z-[-1] before:ml-0 before:block before:h-[30px] before:w-[30px] before:rounded-[50px_0_50px_0] before:bg-sky-400 before:content-[""]`,
        )}
      >
        {message}
      </div>
    </div>
  );
});

MyChatContent.displayName = "OneselfChatContent";
