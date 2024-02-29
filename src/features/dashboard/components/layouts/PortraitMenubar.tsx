import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { ImCross, ImProfile } from "react-icons/im";

import { Button } from "@/components/ui/button";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ToggleIconButton } from "@/components/ui/case/ToggleIconButton";
import { fetcher } from "@/utils/fetcher";

type Props = {
  isLike: boolean | null;
};

export const PortraitMenubar = ({ isLike: initialValue }: Props) => {
  const [isLike, setIsLike] = useState(initialValue);

  const handleLikeClick = async () => {
    const { error, res } = await fetcher("http://localhost:3000/api/like/id", {
      method: "PUT",
    });

    if (!error && res?.ok) {
      setIsLike((prev) => {
        if (prev) {
          return null;
        } else {
          return true;
        }
      });
    } else {
      // TODO: エラーが起きたことを知らせる必要がある
    }
  };

  const handleDislikeClick = async () => {
    const { error, res } = await fetcher("http://localhost:3000/api/dislike/id", {
      method: "PUT",
    });

    if (!error && res?.ok) {
      setIsLike((prev) => {
        if (prev === false) {
          return null;
        } else {
          return false;
        }
      });
    } else {
      // TODO: エラーが起きたことを知らせる必要がある
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4">
      <CarouselPrevious className="static left-auto top-auto h-10 w-10 translate-x-0" />
      <ToggleIconButton
        ariaLabel={isLike ? "いいねしました" : "いいねする"}
        isPressed={!!isLike}
        onClick={() => void handleLikeClick()}
        render={(className) => <AiFillLike className={className} />}
      />
      <ToggleIconButton
        ariaLabel={isLike === false ? "イマイチと評価しました" : "イマイチと評価する"}
        isPressed={isLike === false}
        onClick={() => void handleDislikeClick()}
        render={(className) => <ImCross className={className} />}
      />
      <Button
        aria-label="プロフィールを表示"
        className="rounded-full"
        size="icon"
        variant="outline"
      >
        <ImProfile />
      </Button>
      <CarouselNext className="static bottom-auto left-auto h-10 w-10 translate-x-0" />
    </div>
  );
};
