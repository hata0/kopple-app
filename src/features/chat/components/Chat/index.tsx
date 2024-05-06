import { useRouter } from "next/router";
import useSWR from "swr";

import { ChatContents as ChatContentsType } from "../../types/ChatContents";
import { Message } from "../../types/Message";
import { ChatContents } from "../ChatContents";
import { ChatForm } from "../ChatForm";
import { ChatHeader } from "../ChatHeader";

import { toast } from "@/components/shadcn/ui/use-toast";
import { ChatInput, postMessage } from "@/services/backend/messages/create/[id]";

export const Chat = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents, mutate } = useSWR<ChatContentsType>(`/chats/${id}`);

  const handleSubmit = async (values: ChatInput) => {
    await mutate(
      async () => {
        const { error, res } = await postMessage(id, values);

        if (error) {
          toast({
            title: "メッセージの送信に失敗しました。",
            variant: "destructive",
          });
          throw new Error("ネットワークエラーが発生しました。");
        } else if (res?.status === 401) {
          toast({
            title: "ログインできていません。再度ログインしてください",
            variant: "destructive",
          });
          await router.replace("/sign-in");
        } else {
          const additionalMessage = (await res?.json()) as Message;
          return {
            ...chatContents!,
            messages: [additionalMessage, ...chatContents!.messages],
          };
        }
      },
      {
        optimisticData: {
          ...chatContents!,
          messages: [
            {
              createdAt: new Date(),
              id: crypto.randomUUID(),
              isMyMessage: true,
              message: values.message,
            },
            ...chatContents!.messages,
          ],
        },
        rollbackOnError: true,
      },
    );
  };

  return (
    <div className="flex h-screen flex-col">
      <ChatHeader />
      <ChatContents />
      <ChatForm onSubmit={handleSubmit} />
    </div>
  );
};
