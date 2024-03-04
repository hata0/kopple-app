import { GetServerSideProps } from "next";

import { Users } from "./types/Users";

import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback: {
    "/api/users": Users;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher(`${BACKEND_URL}/users`);

  if (error) {
    throw new Error();
  }

  const users = (await res?.json()) as Users;

  return {
    props: {
      fallback: {
        "/api/users": users,
      },
    },
  };
};
