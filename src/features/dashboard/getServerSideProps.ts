import { GetServerSideProps } from "next";

import { PortraitCard } from "./types/PortraitCard";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback?: {
    "/portraits": PortraitCard[];
  };
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher(`${MOCK_API_URL}/portraits`);

  if (error) {
    throw new Error();
  } else if (!res?.ok) {
    return { props: { error: new HttpError(res!).serialize() } };
  }

  const portraits = (await res?.json()) as PortraitCard[];

  return {
    props: {
      fallback: {
        "/portraits": portraits,
      },
    },
  };
};
