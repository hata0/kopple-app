import { GetServerSideProps } from "next";

import { ChatContents } from "./types/ChatContents";

import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback: {
    [api: string]: ChatContents;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async ({ params }) => {
  const id = params!.id as string;
  const { error, res } = await fetcher(`${BACKEND_URL}/user/chat/${id}`);

  if (error) {
    throw new Error();
  }

  const chatContents = (await res?.json()) as ChatContents;

  return {
    props: {
      fallback: {
        [`/user/chat/${params?.id as string}`]: chatContents,
      },
    },
  };
};
