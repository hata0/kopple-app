import { NextPage } from "next";
import { SWRConfig } from "swr";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { PortraitCarousel } from "@/features/dashboard/components/PortraitCarousel";
import { getServerSideProps, Props } from "@/features/dashboard/getServerSideProps";
import { Error } from "@/features/error/components/Error";

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
