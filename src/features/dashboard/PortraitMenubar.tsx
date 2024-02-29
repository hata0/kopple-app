import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { ImCross, ImProfile } from "react-icons/im";

import { Button } from "@/components/ui/button";
import { CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ToggleIconButton } from "@/components/ui/case/ToggleIconButton";

export const PortraitMenubar = () => {
  const [isLike, setIsLike] = useState(false);
  const [isDislike, setIsDislike] = useState(false);

  const handleLikeClick = () => {
    setIsLike((prev) => !prev);
    setIsDislike(false);
  };

  const handleDislikeClick = () => {
    setIsDislike((prev) => !prev);
    setIsLike(false);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 px-4">
      <CarouselPrevious className="static left-auto top-auto h-10 w-10 translate-x-0" />
      <ToggleIconButton
        ariaLabel={isLike ? "いいねしました" : "いいねする"}
        isPressed={isLike}
        onClick={handleLikeClick}
        render={(className) => <AiFillLike className={className} />}
      />
      <ToggleIconButton
        ariaLabel={isDislike ? "イマイチと評価しました" : "イマイチと評価する"}
        isPressed={isDislike}
        onClick={handleDislikeClick}
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
