import { PortraitCard } from "./PortraitCard";
import { PortraitMenubar } from "./PortraitMenubar";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const PortraitCarousel = () => {
  return (
    <Carousel className="flex" orientation="vertical">
      <CarouselContent className="h-[80vh] w-[448px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <PortraitCard />
          </CarouselItem>
        ))}
      </CarouselContent>
      <PortraitMenubar />
    </Carousel>
  );
};
