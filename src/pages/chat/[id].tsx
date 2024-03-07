import { NextPage } from "next";
import { SWRConfig } from "swr";

import { ChatContents } from "@/features/chat/components/layouts/ChatContents";
import { ChatHeader } from "@/features/chat/components/layouts/ChatHeader";
import { getServerSideProps, Props } from "@/features/chat/getServerSideProps";

export { getServerSideProps };

export const ChatPage: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <ChatHeader />
      <ChatContents />
    </SWRConfig>
  );
};
export default ChatPage;
