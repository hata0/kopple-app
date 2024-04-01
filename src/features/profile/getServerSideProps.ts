import { GetServerSideProps } from "next";
import nookies from "nookies";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { ProfileContent } from "@/types/ProfileContent";
import { HttpError, HttpErrorObject } from "@/utils/HttpError";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  profileContent?: ProfileContent;
  error?: HttpErrorObject;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx);
  const { error, res } = await fetcher(`${MOCK_API_URL}/profiles/${cookies.uid}`);

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
