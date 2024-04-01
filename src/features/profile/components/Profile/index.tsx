import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";
import { ProfileForm } from "../ProfileForm";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ProfileContent } from "@/types/ProfileContent";

export const Profile = (props: ProfileContent) => {
  const handleSubmit = (value: ProfileFormInput) => {
    console.log(value);
  };

  return (
    <div>
      <PostLoginHeader />
      <ProfileForm onSubmit={handleSubmit} profileContent={props} />
    </div>
  );
};
