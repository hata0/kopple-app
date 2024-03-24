import { NextPage } from "next";
import { SWRConfig } from "swr";

import Error from "./_error.page";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { PortraitCarousel } from "@/features/dashboard/components/layouts/PortraitCarousel";
import { getServerSideProps, Props } from "@/features/dashboard/getServerSideProps";

const DashboardPage: NextPage<Props> = ({ error, fallback }) => {
  if (error) {
    return <Error {...error} />;
  }

  return (
    <SWRConfig value={{ fallback }}>
      <PostLoginHeader />
      <PortraitCarousel />
    </SWRConfig>
  );
};

export { getServerSideProps };
export default DashboardPage;
