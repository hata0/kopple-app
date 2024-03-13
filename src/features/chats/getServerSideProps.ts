import { GetServerSideProps } from "next";

import { ChatCard } from "./types/ChatCard";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export type Props = {
  fallback?: {
    "/chats": ChatCard[];
  };
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { error, res } = await fetcherWithAuth(`${MOCK_API_URL}/chats`, ctx);

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
