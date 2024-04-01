import { NextPage } from "next";

import Error from "./_error.page";

import { Profile } from "@/features/profile/components/Profile";
import { getServerSideProps, Props } from "@/features/profile/getServerSideProps";

export { getServerSideProps };

export const ProfilePage: NextPage<Props> = ({ error, profileContent }) => {
  return error ? <Error {...error} /> : <Profile {...profileContent!} />;
};
export default ProfilePage;
