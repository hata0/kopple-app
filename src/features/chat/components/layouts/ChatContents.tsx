import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { InView } from "react-intersection-observer";
import { TailSpin } from "react-loader-spinner";

import { useChatContents } from "../../hooks/useChatContents";

import { DateBadge } from "./DateBadge";
import { InterlocutorChatContent } from "./InterlocutorChatContent";
import { MyChatContent } from "./MyChatContent";

import { ScrollBar } from "@/components/ui/scroll-area";
import { useIsClient } from "@/hooks/useIsClient";

export const ChatContents = () => {
  const { chatContents, handleInfiniteScroll, scrollBottomRef, scrollRef } = useChatContents();
  const { isClient } = useIsClient();

  return (
    <ScrollAreaPrimitive.Root className="relative flex-grow overflow-hidden">
      <ScrollAreaPrimitive.Viewport ref={scrollRef} className="h-full w-full rounded-[inherit]">
        <div className="flex flex-col-reverse space-y-10">
          <div ref={scrollBottomRef} aria-hidden />
          {chatContents?.messages.map((message) => (
            <>
              {message.isMyMessage ? (
                <MyChatContent key={message.id} {...message} />
              ) : (
                <InterlocutorChatContent
                  key={message.id}
                  {...message}
                  imageUrl={chatContents.imageUrl}
                  name={chatContents.name}
                />
              )}
              <DateBadge date={message.createdAt} />
            </>
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
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
    </ScrollAreaPrimitive.Root>
  );
};
