import { GetServerSideProps } from "next";
import nookies from "nookies";

import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { ProfileContent } from "@/types/ProfileContent";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  profileContent?: ProfileContent;
  status?: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies.uid) {
    return { props: { status: 401 } };
  }
  const { error, res } = await fetcher(`${MOCK_API_URL}/profiles/${cookies.uid}`);

  if (error) {
    throw new Error();
  } else if (!res?.ok) {
    return { props: { status: res?.status } };
  }

  const profileContent = (await res?.json()) as ProfileContent;

  return {
    props: {
      profileContent,
    },
  };
};
