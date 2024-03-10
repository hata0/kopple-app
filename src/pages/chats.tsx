import { NextPage } from "next";
import { SWRConfig } from "swr";

import Error from "./_error";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ChatCards } from "@/features/chats/components/layouts/ChatCards";
import { getServerSideProps, Props } from "@/features/chats/getServerSideProps";

export { getServerSideProps };

const ChatsPage: NextPage<Props> = ({ error, fallback }) => {
  if (error) {
    return <Error {...error} />;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <PostLoginHeader />
      <ChatCards />
    </SWRConfig>
  );
};
export default ChatsPage;
