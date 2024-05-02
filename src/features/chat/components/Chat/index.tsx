import { SWRConfig } from "swr";

import { Props } from "../../getServerSideProps";
import { ChatContents } from "../ChatContents";
import { ChatForm } from "../ChatForm";
import { ChatHeader } from "../ChatHeader";

export const Chat = ({ fallback }: Pick<Props, "fallback">) => {
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
