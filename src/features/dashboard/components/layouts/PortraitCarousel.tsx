import { usePortraitCarousel } from "../../hooks/usePortraitCarousel";

import { PortraitCard } from "./PortraitCard";
import { PortraitCardSkeleton } from "./PortraitCardSkeleton";
import { PortraitMenubar } from "./PortraitMenubar";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const PortraitCarousel = () => {
  const { current, setApi, users } = usePortraitCarousel();

  return (
    <Carousel className="flex" orientation="vertical" setApi={setApi}>
      <CarouselContent className="h-[80vh] w-[448px]">
        {users!.portraitCards.map((portraitCard, index) => (
          <CarouselItem key={index}>
            <PortraitCard {...portraitCard} />
          </CarouselItem>
        ))}
        <CarouselItem>
          <PortraitCardSkeleton />
        </CarouselItem>
      </CarouselContent>
      <PortraitMenubar current={current} />
    </Carousel>
  );
};
