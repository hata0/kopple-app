import { NextPage } from "next";

import { Error } from "@/features/error/components/Error";
import { Profile } from "@/features/profile/components/Profile";
import { getServerSideProps, Props } from "@/features/profile/getServerSideProps";
import { ProfileContent } from "@/types/ProfileContent";

export { getServerSideProps };

export const ProfilePage: NextPage<Props> = ({ profileContent: data, status }) => {
  if (status) {
    return <Error status={status} />;
  }

  const profileContent = {
    ...data!,
    birthday: new Date(data!.birthday),
  } satisfies ProfileContent;
  return <Profile {...profileContent} />;
};
export default ProfilePage;
