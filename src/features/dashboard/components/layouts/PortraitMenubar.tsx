import { memo } from "react";
import { AiFillLike } from "react-icons/ai";
import useSWR from "swr";

import { Users } from "../../types/Users";

import { ProfileDrawer } from "./ProfileDrawer";

import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ToggleIconButton } from "@/components/ui/case/ToggleIconButton";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

type Props = {
  current: number;
};

export const PortraitMenubar = memo(({ current }: Props) => {
  const { data: users, mutate } = useSWR<Users>("/users");
  const isLike = users!.isLikes[current];

  const handleLikeClick = async () => {
    const updatedUsers = {
      ...users!,
      isLikes: users!.isLikes.map((isLike, index) => {
        return index === current ? !isLike : isLike;
      }),
    };

    await mutate(
      async () => {
        const { error } = await fetcher(`${BACKEND_URL}/like/${current}`, {
          method: "PUT",
        });

        if (error) {
          toast({
            title: "いいねの更新に失敗しました",
            variant: "destructive",
          });
          throw new Error();
        }

        return updatedUsers;
      },
      {
        optimisticData: updatedUsers,
        rollbackOnError: true,
      },
    );
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-14 px-4">
      <CarouselPrevious className="static left-auto top-auto h-10 w-10 translate-x-0" />
      <ToggleIconButton
        ariaLabel={isLike ? "いいねしました" : "いいねする"}
        isPressed={!!isLike}
        onClick={() => void handleLikeClick()}
        render={(className) => <AiFillLike className={className} />}
      />
      <ProfileDrawer current={current} />
      <CarouselNext className="static bottom-auto left-auto h-10 w-10 translate-x-0" />
    </div>
  );
});

PortraitMenubar.displayName = "PortraitMenubar";
