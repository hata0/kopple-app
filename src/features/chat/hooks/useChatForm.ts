import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

import { ChatContents } from "../types/ChatContents";
import { Message } from "../types/Message";

import { toast } from "@/components/shadcn/ui/use-toast";
import { postMessage } from "@/services/backend/messages/create/[id]";
import { chatInputSchema } from "@/services/backend/messages/create/[id]/schema";
import { ChatInput } from "@/services/backend/messages/create/[id]/type";

export const useChatForm = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents, mutate } = useSWR<ChatContents>(`/chats/${id}`);
  const [rows, setRows] = useState(0);
  const messageHeightRef = useRef<HTMLTextAreaElement>(null);
  const form = useForm<ChatInput>({
    defaultValues: {
      message: "",
    },
    mode: "onChange",
    resolver: zodResolver(chatInputSchema),
  });
  const watchMessage = form.watch("message", "");

  useEffect(() => {
    if (messageHeightRef.current) {
      const rows = Math.floor(messageHeightRef.current.scrollHeight / 20);
      setRows(rows);
    }
  }, [watchMessage]);

  const onSubmit = useCallback(
    async (values: ChatInput) => {
      form.reset();

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
    },
    [chatContents, form, id, mutate, router],
  );

  const handleKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        await form.handleSubmit(onSubmit)(e);
      }
    },
    [form, onSubmit],
  );

  return {
    form,
    handleKeyDown,
    messageHeightRef,
    onSubmit,
    rows,
  };
};
