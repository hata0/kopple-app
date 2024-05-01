import { NextPage } from "next";
import { SWRConfig } from "swr";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ChatCards } from "@/features/chats/components/ChatCards";
import { getServerSideProps, Props } from "@/features/chats/getServerSideProps";
import { Error } from "@/features/error/components/Error";

export { getServerSideProps };

const ChatsPage: NextPage<Props> = ({ fallback, status }) => {
  if (status) {
    return <Error status={status} />;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <PostLoginHeader />
      <ChatCards />
    </SWRConfig>
  );
};
export default ChatsPage;
