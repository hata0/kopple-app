import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { ProfileForm } from "@/features/profile/components/layouts/ProfileForm";

export default function ProfilePage() {
  return (
    <div>
      <PostLoginHeader />
      <ProfileForm />
    </div>
  );
}
