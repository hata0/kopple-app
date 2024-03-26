import { memo } from "react";
import { ImProfile } from "react-icons/im";

import { useProfile } from "../hooks/useProfile";

import { ProfileContent } from "./ProfileContent";
import { ProfileSkeleton } from "./ProfileSkeleton";

import { Button } from "@/components/shadcn/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/shadcn/ui/drawer";

type Props = {
  id: string;
};

export const ProfileDrawer = memo(({ id }: Props) => {
  const { fetchProfile, profileContent } = useProfile(id);

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
