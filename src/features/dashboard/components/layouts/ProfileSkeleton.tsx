import { memo } from "react";

export const ProfileSkeleton = memo(() => {
  return (
    <div>
      <div>ロード中</div>
    </div>
  );
});

ProfileSkeleton.displayName = "ProfileSkeleton";
