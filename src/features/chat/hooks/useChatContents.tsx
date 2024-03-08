import { useRouter } from "next/router";
import { useCallback, useEffect, useRef } from "react";
import useSWR from "swr";

import { ChatContents } from "../types/ChatContents";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export const useChatContents = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents, mutate } = useSWR<ChatContents>(`/user/chat/${id}`);
  const initialScrollPosRef = useRef<HTMLDivElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialScrollPosRef.current) {
      initialScrollPosRef.current.scrollIntoView();
    }
  }, []);

  const handleInfiniteScroll = async (isInView: boolean) => {
    if (isInView && scrollRef.current) {
      const prevHeight = scrollRef.current.scrollHeight;
      await getChatContents();
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
    }
  };

  const getChatContents = useCallback(async () => {
    const { error, res } = await fetcher(`${BACKEND_URL}/user/chat/${id}`);

    if (error) {
      toast({
        action: (
          <ToastAction altText="再取得" onClick={() => void getChatContents()}>
            再取得
          </ToastAction>
        ),
        title: "追加のデータ取得に失敗しました",
        variant: "destructive",
      });
    } else {
      const additionalChatContents = (await res?.json()) as ChatContents;
      await mutate({
        ...chatContents!,
        messages: [...chatContents!.messages, ...additionalChatContents.messages],
      });
    }
  }, [chatContents, id, mutate]);

  return {
    chatContents,
    handleInfiniteScroll,
    initialScrollPosRef,
    scrollRef,
  };
};
