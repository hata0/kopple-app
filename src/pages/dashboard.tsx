import { NextPage } from "next";

import { DashboardHeader } from "@/components/layouts/domain/DashboardHeader";
import { PortraitCarousel } from "@/features/dashboard/components/layouts/PortraitCarousel";
import { getServerSideProps, Props } from "@/features/dashboard/getServerSideProps";

const DashboardPage: NextPage<Props> = ({ users }) => {
  return (
    <div>
      <DashboardHeader />
      <PortraitCarousel {...users} />
    </div>
  );
};

export { getServerSideProps };
export default DashboardPage;
