import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import useSWR from "swr";

import { ChatContents } from "../types/ChatContents";
import { Message } from "../types/Message";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export const useChatContents = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents, mutate } = useSWR<ChatContents>(`/chats/${id}`);
  const messages = chatContents!.messages;
  const [prevMessages, setPrevMessages] = useState<Message[]>([]);
  const [prevHeight, setPrevHeight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollBottomRef = useRef<HTMLDivElement>(null);

  // 初期スクロール位置をスクロール最下部にし、高さの初期値を設定
  useEffect(() => {
    if (scrollBottomRef.current) {
      scrollBottomRef.current.scrollIntoView();
    }
    if (scrollRef.current) {
      setPrevHeight(scrollRef.current.scrollHeight);
    }
  }, []);

  // 先頭と末尾に要素を追加したときのスクロール操作で、削除時には影響しない
  useEffect(() => {
    if (
      messages.length > prevMessages.length &&
      prevMessages.length > 0 &&
      scrollBottomRef.current &&
      scrollRef.current
    ) {
      const isFirstMatch = messages[0].id === prevMessages[0].id;
      const isLastMatch =
        messages[messages.length - 1].id === prevMessages[prevMessages.length - 1].id;

      if (isFirstMatch && !isLastMatch) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight - prevHeight;
      } else if (!isFirstMatch && isLastMatch) {
        scrollBottomRef.current.scrollIntoView();
      }
    }

    if (scrollRef.current) {
      setPrevHeight(scrollRef.current.scrollHeight);
    }
    setPrevMessages(messages);
  }, [messages, prevHeight, prevMessages]);

  const handleInfiniteScroll = async (isInView: boolean) => {
    if (isInView) {
      await getChatContents();
    }
  };

  const getChatContents = useCallback(async () => {
    const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/chats/${id}`);

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
    } else if (res?.status === 401) {
      toast({
        title: "ログインできていません",
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
    scrollBottomRef,
    scrollRef,
  };
};
