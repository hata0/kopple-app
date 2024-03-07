import { memo } from "react";
import { AiFillLike } from "react-icons/ai";
import { ImProfile } from "react-icons/im";
import useSWR from "swr";

import { PortraitCard } from "../../types/PortraitCard";

import { ProfileDrawer } from "./ProfileDrawer";

import { Button } from "@/components/ui/button";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ToggleIconButton } from "@/components/ui/case/ToggleIconButton";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

type Props = {
  current: number;
};

export const PortraitMenubar = memo(({ current }: Props) => {
  const { data: portraitCards, mutate } = useSWR<PortraitCard[]>("/users/portraits");
  const isLike = portraitCards![current] ? portraitCards![current].isLike : false;
  const id = portraitCards![current] ? portraitCards![current].id : undefined;

  const handleLikeClick = async () => {
    if (!id) {
      return;
    }

    const updatedUsers = portraitCards?.map((portraitCard, index) => {
      return index === current
        ? {
            ...portraitCard,
            isLike: !isLike,
          }
        : portraitCard;
    });

    await mutate(
      async () => {
        const { error } = await fetcher(`${BACKEND_URL}/user/like/${id}`, {
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
      {id ? (
        <ProfileDrawer id={id} />
      ) : (
        <Button
          aria-label="プロフィールを表示"
          className="rounded-full"
          size="icon"
          variant="outline"
        >
          <ImProfile />
        </Button>
      )}
      <CarouselNext className="static bottom-auto left-auto h-10 w-10 translate-x-0" />
    </div>
  );
});

PortraitMenubar.displayName = "PortraitMenubar";
