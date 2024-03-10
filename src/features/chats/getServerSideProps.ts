import { GetServerSideProps } from "next";

import { ChatCard } from "./types/ChatCard";

import { BACKEND_URL } from "@/constants/backendUrl";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export type Props = {
  fallback?: {
    "/chats": ChatCard[];
  };
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/chats`);

  if (error) {
    throw new Error();
  } else if (!res?.ok) {
    return { props: { error: new HttpError(res!).serialize() } };
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
