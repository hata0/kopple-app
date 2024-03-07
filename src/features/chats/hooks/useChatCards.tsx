import { useCallback } from "react";
import useSWR from "swr";

import { ChatCard } from "../types/ChatCard";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { fetcher } from "@/utils/fetcher";

// FIXME:
// React Strict Mode のとき二回以上クエリが投げられる問題を解決するため、
// react-intersection-observerとuseSWRInfiniteを使って再実装する必要がある
// また、何か削除した後に最下部までスクロールすると無限スクロールできないバグが発生する
export const useChatCards = () => {
  const { data: chatCards, mutate } = useSWR<ChatCard[]>("/users/chats");
  const { scrollPosition } = useScrollPosition();
  const maxScrollPosition =
    typeof document === "undefined" ? 0 : document.documentElement.scrollHeight;
  const isPageBottom = scrollPosition >= maxScrollPosition;

  const getChatCards = useCallback(async () => {
    const { error, res } = await fetcher(`${BACKEND_URL}/users/chats`);

    if (error) {
      toast({
        action: (
          <ToastAction altText="再取得" onClick={() => void getChatCards()}>
            再取得
          </ToastAction>
        ),
        title: "追加のデータ取得に失敗しました",
        variant: "destructive",
      });
    } else {
      const additionalChatCards = (await res!.json()) as ChatCard[];
      await mutate([...chatCards!, ...additionalChatCards], false);
    }
  }, [chatCards, mutate]);

  if (isPageBottom) {
    void getChatCards();
  }

  return {
    chatCards,
    isPageBottom,
  };
};
