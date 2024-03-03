import { GetServerSideProps } from "next";

import { Users } from "./types/Users";

import { fetcher } from "@/utils/fetcher";

export type Props = {
  users: Users;
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher("http://localhost:3000/api/users");

  if (error) {
    throw new Error();
  }

  const users = (await res?.json()) as Users;

  return { props: { users } };
};
