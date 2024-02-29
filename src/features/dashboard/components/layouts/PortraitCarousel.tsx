import { Users } from "../../types/Users";

import { PortraitCard } from "./PortraitCard";
import { PortraitMenubar } from "./PortraitMenubar";

import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const PortraitCarousel = ({ isLikes, portraitCards }: Users) => {
  return (
    <Carousel className="flex" orientation="vertical">
      <CarouselContent className="h-[80vh] w-[448px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
            <PortraitCard {...portraitCards[0]} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <PortraitMenubar isLike={isLikes[0]} />
    </Carousel>
  );
};
