import { GetServerSideProps } from "next";
import nookies from "nookies";

import { ProfileContent } from "../dashboard/types/ProfileContent";

import { BACKEND_URL } from "@/constants/backendUrl";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export type Props = {
  profileContent?: ProfileContent;
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx);
  const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/profiles/${cookies.uid}`, ctx);

  if (error) {
    throw new Error();
  } else if (!res?.ok) {
    return { props: { error: new HttpError(res!).serialize() } };
  }

  const profileContent = (await res?.json()) as ProfileContent;

  return {
    props: {
      profileContent,
    },
  };
};
