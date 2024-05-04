import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { z } from "zod";

import { ChatContents } from "../types/ChatContents";
import { Message } from "../types/Message";

import { toast } from "@/components/shadcn/ui/use-toast";
import { postMessage } from "@/services/backend/messages/create/[id]";

const formSchema = z.object({
  message: z.string().min(1),
});

export const useChatForm = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents, mutate } = useSWR<ChatContents>(`/chats/${id}`);
  const [rows, setRows] = useState(0);
  const messageHeightRef = useRef<HTMLTextAreaElement>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      message: "",
    },
    mode: "onChange",
    resolver: zodResolver(formSchema),
  });
  const watchMessage = form.watch("message", "");

  useEffect(() => {
    if (messageHeightRef.current) {
      const rows = Math.floor(messageHeightRef.current.scrollHeight / 20);
      setRows(rows);
    }
  }, [watchMessage]);

  const onSubmit = useCallback(
    async (values: z.infer<typeof formSchema>) => {
      const { message } = values;
      form.reset();

      let additionalMessage: Message;

      await mutate(
        async () => {
          const { error, res } = await postMessage(id, message);

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
            additionalMessage = (await res?.json()) as Message;
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
                message,
              },
              ...chatContents!.messages,
            ],
          },
          rollbackOnError: true,
        },
      );

      const func = async () => {
        await mutate({
          ...chatContents!,
          messages: [
            {
              createdAt: new Date(),
              id: crypto.randomUUID(),
              isMyMessage: false,
              message: "オッケー!",
            },
            additionalMessage,
            ...chatContents!.messages,
          ],
        });
      };

      setTimeout(() => void func(), 5000);
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
