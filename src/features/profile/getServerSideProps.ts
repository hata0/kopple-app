import { GetServerSideProps } from "next";
import nookies from "nookies";

import { getProfile } from "@/services/backend/profiles/[id]";
import { ProfileContent } from "@/types/ProfileContent";

export type Props = {
  profileContent?: ProfileContent;
  status?: number;
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const cookies = nookies.get(ctx);
  if (!cookies.uid) {
    return { props: { status: 401 } };
  }
  const { error, res } = await getProfile(cookies.uid);

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
