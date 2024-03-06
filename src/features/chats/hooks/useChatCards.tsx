import { useCallback } from "react";

import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { fetcher } from "@/utils/fetcher";

export const useChatCards = () => {
  // TODO: chatCardsをswrで取得

  const { scrollPosition } = useScrollPosition();
  const maxScrollPosition =
    typeof document === "undefined" ? 0 : document.documentElement.scrollHeight;
  const isPageBottom = scrollPosition >= maxScrollPosition;

  const getChatCards = useCallback(async () => {
    const { error } = await fetcher(`${BACKEND_URL}/users/chats`);

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
      // TODO: ここでswrのmutate
    }
  }, []);

  if (isPageBottom) {
    void getChatCards();
  }

  return {
    isPageBottom,
  };
};
