import { memo } from "react";
import useSWR from "swr";

import { ChatCard } from "../../types/ChatCard";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

type Props = {
  id: string;
};

export const DeleteChatDialog = memo(({ id }: Props) => {
  const { data: chatCards, mutate } = useSWR<ChatCard[]>(`/users/chats`);

  const handleDeleteClick = async () => {
    const updatedChatCards = chatCards?.filter((chatCard) => {
      return chatCard.id !== id;
    });

    await mutate(
      async () => {
        const { error } = await fetcher(`${BACKEND_URL}/user/chat/${id}`, {
          method: "DELETE",
        });

        if (error) {
          toast({
            title: "削除に失敗しました",
            variant: "destructive",
          });
          throw new Error();
        }

        return updatedChatCards;
      },
      {
        optimisticData: updatedChatCards,
        rollbackOnError: true,
      },
    );
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">削除</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>本当に削除しますか？</AlertDialogTitle>
          <AlertDialogDescription>
            この操作は取り消すことができず、すべてのチャット履歴が削除されます。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={() => void handleDeleteClick()}>削除</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
});

DeleteChatDialog.displayName = "DeleteChatDialog";
