import { NextPage } from "next";
import { SWRConfig } from "swr";

import Error from "../_error";

import { ChatContents } from "@/features/chat/components/layouts/ChatContents";
import { ChatForm } from "@/features/chat/components/layouts/ChatForm";
import { ChatHeader } from "@/features/chat/components/layouts/ChatHeader";
import { getServerSideProps, Props } from "@/features/chat/getServerSideProps";

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
