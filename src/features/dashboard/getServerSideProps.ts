import { GetServerSideProps } from "next";

import { PortraitCard } from "./types/PortraitCard";

import { BACKEND_URL } from "@/constants/backendUrl";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export type Props = {
  fallback?: {
    "/portraits": PortraitCard[];
  };
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/auth/kurakke`, ctx);

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
