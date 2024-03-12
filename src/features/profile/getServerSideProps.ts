import { GetServerSideProps } from "next";

import { ProfileContent } from "../dashboard/types/ProfileContent";

import { BACKEND_URL } from "@/constants/backendUrl";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export type Props = {
  profileContent?: ProfileContent;
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  // TODO: クッキーにuidをもたせて与える
  const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/profiles/uid`, ctx);

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
