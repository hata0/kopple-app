import { NextPage } from "next";
import { SWRConfig } from "swr";

import { ChatContents } from "@/features/chat/components/ChatContents";
import { ChatForm } from "@/features/chat/components/ChatForm";
import { ChatHeader } from "@/features/chat/components/ChatHeader";
import { getServerSideProps, Props } from "@/features/chat/getServerSideProps";
import { Error } from "@/features/error/components/Error";

export { getServerSideProps };

export const ChatPage: NextPage<Props> = ({ error, fallback }) => {
  if (error) {
    return <Error {...error} />;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <div className="flex h-screen flex-col">
        <ChatHeader />
        <ChatContents />
        <ChatForm />
      </div>
    </SWRConfig>
  );
};
export default ChatPage;
