import { usePortraitCarousel } from "../../hooks/usePortraitCarousel";

import { PortraitCard } from "./PortraitCard";
import { PortraitCardSkeleton } from "./PortraitCardSkeleton";
import { PortraitMenubar } from "./PortraitMenubar";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const PortraitCarousel = () => {
  const { current, portraitCards, setApi } = usePortraitCarousel();

  return (
    <Carousel className="flex" orientation="vertical" setApi={setApi}>
      <CarouselContent className="h-[80vh] w-[448px]">
        {portraitCards!.map((portraitCard) => (
          <CarouselItem key={portraitCard.id}>
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
