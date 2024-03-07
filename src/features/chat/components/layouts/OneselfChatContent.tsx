import { cn } from "@/lib/utils";

export const OneselfChatContent = () => {
  return (
    <div className="flex w-full justify-end">
      <div className="mr-2 flex items-end text-xs font-medium text-sky-400">時刻</div>
      <div
        className={cn(
          `relative mr-5 inline-block rounded-[10px] bg-sky-400 p-2`,
          `before:absolute before:bottom-[8px] before:left-[54px] before:z-[-1] before:ml-0 before:block before:h-[30px] before:w-[30px] before:rounded-[50px_0_50px_0] before:bg-sky-400 before:content-[""]`,
        )}
      >
        メッセージ
      </div>
    </div>
  );
};
