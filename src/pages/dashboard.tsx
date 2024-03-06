import { NextPage } from "next";
import { SWRConfig } from "swr";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { PortraitCarousel } from "@/features/dashboard/components/layouts/PortraitCarousel";
import { getServerSideProps, Props } from "@/features/dashboard/getServerSideProps";

const DashboardPage: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <PostLoginHeader />
      <PortraitCarousel />
    </SWRConfig>
  );
};

export { getServerSideProps };
export default DashboardPage;
