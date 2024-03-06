import { GetServerSideProps } from "next";

import { ChatCard } from "./types/ChatCard";

import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback: {
    "/users/chats": ChatCard[];
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher(`${BACKEND_URL}/users/chats`);

  if (error) {
    throw new Error();
  }

  const chatCards = (await res?.json()) as ChatCard[];

  return {
    props: {
      fallback: {
        "/users/chats": chatCards,
      },
    },
  };
};
