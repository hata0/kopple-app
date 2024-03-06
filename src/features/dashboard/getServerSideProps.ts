import { GetServerSideProps } from "next";

import { Portraits } from "./types/Portraits";

import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback: {
    "/users/portraits": Portraits;
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher(`${BACKEND_URL}/users/portraits`);

  if (error) {
    throw new Error();
  }

  const portraits = (await res?.json()) as Portraits;

  return {
    props: {
      fallback: {
        "/users/portraits": portraits,
      },
    },
  };
};
