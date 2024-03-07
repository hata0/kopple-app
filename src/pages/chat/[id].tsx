import { ChatContents } from "@/features/chat/components/layouts/ChatContents";
import { ChatHeader } from "@/features/chat/components/layouts/ChatHeader";

export const ChatPage = () => {
  return (
    <div>
      <ChatHeader />
      <ChatContents />
    </div>
  );
};
export default ChatPage;
