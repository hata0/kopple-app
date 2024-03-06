import { TailSpin } from "react-loader-spinner";

import { useChatCards } from "../../hooks/useChatCards";

import { ChatCard } from "./ChatCard";

export const ChatCards = () => {
  const { isPageBottom } = useChatCards();

  return (
    <div>
      {Array.from({ length: 10 }).map((_, index) => (
        <ChatCard key={index} />
      ))}
      <div className="flex h-[60px] w-full items-center justify-center">
        <TailSpin
          ariaLabel="ロード中"
          color="#4fa94d"
          height="40"
          radius="1"
          visible={isPageBottom}
          width="40"
        />
      </div>
    </div>
  );
};
