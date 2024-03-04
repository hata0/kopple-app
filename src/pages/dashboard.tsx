import { NextPage } from "next";
import { SWRConfig } from "swr";

import { DashboardHeader } from "@/components/layouts/domain/DashboardHeader";
import { PortraitCarousel } from "@/features/dashboard/components/layouts/PortraitCarousel";
import { getServerSideProps, Props } from "@/features/dashboard/getServerSideProps";

const DashboardPage: NextPage<Props> = ({ fallback }) => {
  return (
    <SWRConfig value={{ fallback }}>
      <DashboardHeader />
      <PortraitCarousel />
    </SWRConfig>
  );
};

export { getServerSideProps };
export default DashboardPage;
