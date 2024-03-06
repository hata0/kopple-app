import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ChatCards } from "@/features/talk/components/layouts/ChatCards";

export default function TalkPage() {
  // TODO: ssr使ってswrConfigに渡す
  return (
    <div>
      <PostLoginHeader />
      <ChatCards />
    </div>
  );
}
