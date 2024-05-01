import { NextPage } from "next";
import { SWRConfig } from "swr";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { PortraitCarousel } from "@/features/dashboard/components/PortraitCarousel";
import { getServerSideProps, Props } from "@/features/dashboard/getServerSideProps";
import { Error } from "@/features/error/components/Error";

const DashboardPage: NextPage<Props> = ({ fallback, status }) => {
  if (status) {
    return <Error status={status} />;
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
