import { NextPage } from "next";

import { Error } from "@/features/error/components/Error";
import { Profile } from "@/features/profile/components/Profile";
import { getServerSideProps, Props } from "@/features/profile/getServerSideProps";
import { ProfileContent } from "@/types/ProfileContent";

export { getServerSideProps };

export const ProfilePage: NextPage<Props> = ({ error, profileContent: data }) => {
  const profileContent = {
    ...data!,
    birthday: new Date(data!.birthday),
  } satisfies ProfileContent;

  return error ? <Error {...error} /> : <Profile {...profileContent} />;
};
export default ProfilePage;
