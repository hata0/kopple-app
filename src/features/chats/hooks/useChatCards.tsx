import { useCallback } from "react";
import useSWR from "swr";

import { ChatCard } from "../types/ChatCard";

import { ToastAction } from "@/components/shadcn/ui/toast";
import { toast } from "@/components/shadcn/ui/use-toast";
import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcher } from "@/utils/fetcher";

export const useChatCards = () => {
  const { data: chatCards, mutate } = useSWR<ChatCard[]>("/chats");

  const getChatCards = useCallback(async () => {
    const { error, res } = await fetcher(`${MOCK_API_URL}/chats`);

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
    } else if (res?.status === 401) {
      toast({
        title: "ログインできていません",
        variant: "destructive",
      });
    } else {
      const additionalChatCards = (await res!.json()) as ChatCard[];
      await mutate([...chatCards!, ...additionalChatCards], false);
    }
  }, [chatCards, mutate]);

  return {
    chatCards,
    getChatCards,
  };
};
