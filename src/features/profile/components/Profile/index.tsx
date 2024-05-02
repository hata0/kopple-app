import { parseCookies } from "nookies";

import { ProfileForm } from "../ProfileForm";

import { PostLoginHeader } from "@/components/layouts/domain/PostLoginHeader";
import { toast } from "@/components/shadcn/ui/use-toast";
import { postProfile, ProfileFormInput } from "@/services/backend/profiles/[id]";
import { ProfileContent } from "@/types/ProfileContent";

export const Profile = (props: ProfileContent) => {
  const handleSubmit = async (value: ProfileFormInput) => {
    const { uid } = parseCookies();
    if (!uid) {
      toast({
        description: "もう一度ログインしてください",
        title: "ログインできていません",
        variant: "destructive",
      });
      return;
    }

    try {
      const res = await postProfile(uid, value);
      if (!res.ok) {
        toast({
          title: "プロフィールの更新に失敗しました。",
          variant: "destructive",
        });
      } else {
        toast({
          title: "プロフィールを更新しました。",
        });
      }
    } catch (e) {
      toast({
        title: "サーバー側で問題が発生しました。",
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <PostLoginHeader />
      <ProfileForm onSubmit={handleSubmit} profileContent={props} />
    </div>
  );
};
