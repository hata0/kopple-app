import { InView } from "react-intersection-observer";
import { TailSpin } from "react-loader-spinner";

import { useChatCards } from "../../hooks/useChatCards";

import { ChatCard } from "./ChatCard";

import { useIsClient } from "@/hooks/useIsClient";

export const ChatCards = () => {
  const { chatCards, getChatCards } = useChatCards();
  const { isClient } = useIsClient();

  const handleInfiniteScroll = async (isInView: boolean) => {
    if (isInView) {
      await getChatCards();
    }
  };

  return (
    <div>
      {chatCards!.map((chatCard) => (
        <ChatCard key={chatCard.id} {...chatCard} />
      ))}
      <InView
        as="div"
        className="flex h-[60px] w-full items-center justify-center"
        onChange={(isInView) => void handleInfiniteScroll(isInView)}
      >
        {isClient && (
          <TailSpin
            visible
            ariaLabel="ロード中"
            color="#4fa94d"
            height="40"
            radius="1"
            width="40"
          />
        )}
      </InView>
    </div>
  );
};
