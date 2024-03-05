import { memo } from "react";
import { ImProfile } from "react-icons/im";

import { useProfile } from "../../hooks/useProfile";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

type Props = {
  current: number;
};

export const ProfileDrawer = memo(({ current }: Props) => {
  const { fetchProfile, profile } = useProfile(current);

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
        <div>{profile?.name}</div>
      </DrawerContent>
    </Drawer>
  );
});

ProfileDrawer.displayName = "ProfileDrawer";
