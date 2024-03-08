import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdBackspace } from "react-icons/io";
import useSWR from "swr";

import { ChatContents } from "../../types/ChatContents";

import { Button } from "@/components/ui/button";

export const ChatHeader = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents } = useSWR<ChatContents>(`/chats/${id}`);

  return (
    <header aria-label="ヘッダー" className="relative flex w-full bg-accent p-2">
      <Button asChild aria-label="チャットリストへ" className="right-auto px-3" variant="outline">
        <Link href="/chats">
          <IoMdBackspace className="h-10 w-10" />
        </Link>
      </Button>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg font-medium">
        {chatContents?.name}
      </div>
    </header>
  );
};
