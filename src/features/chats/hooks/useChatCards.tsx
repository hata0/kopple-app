import { useCallback } from "react";
import useSWR from "swr";

import { ChatCard } from "../types/ChatCard";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export const useChatCards = () => {
  const { data: chatCards, mutate } = useSWR<ChatCard[]>("/chats");

  const getChatCards = useCallback(async () => {
    const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/chats`);

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
        title: "認証に失敗しました。",
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
