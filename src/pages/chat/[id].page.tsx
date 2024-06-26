import { NextPage } from "next";
import { SWRConfig } from "swr";

import { Chat } from "@/features/chat/components/Chat";
import { getServerSideProps, Props } from "@/features/chat/getServerSideProps";
import { Error } from "@/features/error/components/Error";

export { getServerSideProps };

export const ChatPage: NextPage<Props> = ({ fallback, status }) => {
  if (status) {
    return <Error status={status} />;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <Chat />
    </SWRConfig>
  );
};
export default ChatPage;
