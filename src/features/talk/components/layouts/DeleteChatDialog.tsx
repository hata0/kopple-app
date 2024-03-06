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

export const DeleteChatDialog = () => {
  // TODO: idをPropsに渡す
  const id = 1;

  const handleDeleteClick = async () => {
    // TODO: 実際はswrのmutateを使って行い楽観的更新を行う
    const { error } = await fetcher(`${BACKEND_URL}/user/chat/${id}`, {
      method: "DELETE",
    });

    if (error) {
      toast({
        title: "削除に失敗しました",
        variant: "destructive",
      });
    } else {
      // TODO: 成功時の処理を記述
    }
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
};
