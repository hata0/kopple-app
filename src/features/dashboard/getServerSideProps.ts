import { GetServerSideProps } from "next";

import { PortraitCard } from "./types/PortraitCard";

import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export type Props = {
  fallback: {
    "/portraits": PortraitCard[];
  };
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const { error, res } = await fetcher(`${BACKEND_URL}/portraits`);

  if (error) {
    throw new Error();
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
