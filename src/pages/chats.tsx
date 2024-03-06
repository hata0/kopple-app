import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ChatCards } from "@/features/chats/components/layouts/ChatCards";

export default function ChatsPage() {
  // TODO: ssr使ってswrConfigに渡す
  return (
    <div>
      <PostLoginHeader />
      <ChatCards />
    </div>
  );
}
