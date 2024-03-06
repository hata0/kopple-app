import { DeleteChatDialog } from "./DeleteChatDialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export const ChatCard = () => {
  // TODO: chatCardをPropsで渡す
  return (
    <Card>
      <CardContent className="flex py-2">
        <div className="flex items-center justify-center">
          <Avatar>
            <AvatarImage alt="プロフィール画像" src="/portrait/1.png" />
            <AvatarFallback>ロード中</AvatarFallback>
          </Avatar>
        </div>
        <div className="w-full overflow-hidden">
          <div className="truncate">ユーザー名</div>
          <div className="truncate">最後の会話内容</div>
        </div>
        <div className="ml-auto flex space-x-2">
          <div className="whitespace-nowrap">最終更新日</div>
          <div className="flex h-full items-center">
            <DeleteChatDialog />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
