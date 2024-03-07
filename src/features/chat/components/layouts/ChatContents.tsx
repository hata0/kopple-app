import { useRouter } from "next/router";
import useSWR from "swr";

import { ChatContents as ChatContentsType } from "../../types/ChatContents";

import { InterlocutorChatContent } from "./InterlocutorChatContent";
import { MyChatContent } from "./MyChatContent";

export const ChatContents = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents } = useSWR<ChatContentsType>(`/user/chat/${id}`);

  return (
    <div className="space-y-3 p-3">
      {chatContents?.messages.map((message) => {
        return message.isMyMessage ? (
          <MyChatContent key={message.id} {...message} />
        ) : (
          <InterlocutorChatContent
            key={message.id}
            {...message}
            imageUrl={chatContents.imageUrl}
            name={chatContents.name}
          />
        );
      })}
    </div>
  );
};
