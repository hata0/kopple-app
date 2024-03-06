import { TailSpin } from "react-loader-spinner";

import { useChatCards } from "../../hooks/useChatCards";

import { ChatCard } from "./ChatCard";

import { useIsClient } from "@/hooks/useIsClient";

export const ChatCards = () => {
  const { chatCards, isPageBottom } = useChatCards();
  const { isClient } = useIsClient();

  return (
    <div>
      {chatCards!.map((chatCard) => (
        <ChatCard {...chatCard} key={chatCard.id} />
      ))}
      <div className="flex h-[60px] w-full items-center justify-center">
        {isClient && (
          <TailSpin
            ariaLabel="ロード中"
            color="#4fa94d"
            height="40"
            radius="1"
            visible={isPageBottom}
            width="40"
          />
        )}
      </div>
    </div>
  );
};
