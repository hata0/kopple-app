import { useEffect, useState } from "react";

import { Users } from "../../types/Users";

import { PortraitCard } from "./PortraitCard";
import { PortraitMenubar } from "./PortraitMenubar";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export const PortraitCarousel = ({ isLikes, portraitCards }: Users) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel className="flex" orientation="vertical" setApi={setApi}>
      <CarouselContent className="h-[80vh] w-[448px]">
        {portraitCards.map((portraitCard, index) => (
          <CarouselItem key={index}>
            <PortraitCard {...portraitCard} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <PortraitMenubar current={current} isLikes={isLikes} />
    </Carousel>
  );
};
