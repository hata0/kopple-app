import { memo } from "react";
import { ImProfile } from "react-icons/im";

import { useProfile } from "../../hooks/useProfile";

import { ProfileContent } from "./ProfileContent";
import { ProfileSkeleton } from "./ProfileSkeleton";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type Props = {
  current: number;
};

export const ProfileDrawer = memo(({ current }: Props) => {
  const { fetchProfile, profileContent } = useProfile(current);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          aria-label="プロフィールを表示"
          className="rounded-full"
          onClick={() => void fetchProfile()}
          size="icon"
          variant="outline"
        >
          <ImProfile />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {profileContent ? <ProfileContent {...profileContent} /> : <ProfileSkeleton />}
      </DrawerContent>
    </Drawer>
  );
});

ProfileDrawer.displayName = "ProfileDrawer";
