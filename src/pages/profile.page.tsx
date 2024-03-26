import { NextPage } from "next";

import Error from "./_error.page";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ProfileForm } from "@/features/profile/components/ProfileForm";
import { getServerSideProps, Props } from "@/features/profile/getServerSideProps";

export { getServerSideProps };

export const ProfilePage: NextPage<Props> = ({ error, profileContent }) => {
  if (error) {
    return <Error {...error} />;
  }

  return (
    <div>
      <PostLoginHeader />
      <ProfileForm {...profileContent!} />
    </div>
  );
};
export default ProfilePage;
