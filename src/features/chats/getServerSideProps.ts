import { GetServerSideProps } from "next";

import { ChatCard } from "./types/ChatCard";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback?: {
    "/chats": ChatCard[];
  };
  status?: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher(`${MOCK_API_URL}/chats`);

  if (error) {
    throw new Error();
  } else if (!res?.ok) {
    return { props: { status: res?.status } };
  }

  const chatCards = (await res?.json()) as ChatCard[];

  return {
    props: {
      fallback: {
        "/chats": chatCards,
      },
    },
  };
};
