import { useEffect, useState } from "react";

import { Users } from "../../types/Users";

import { PortraitCard } from "./PortraitCard";
import { PortraitCardSkeleton } from "./PortraitCardSkeleton";
import { PortraitMenubar } from "./PortraitMenubar";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { fetcher } from "@/utils/fetcher";

export const PortraitCarousel = (initialValue: Users) => {
  const [users, setUsers] = useState(initialValue);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (api) {
      setCurrent(api.selectedScrollSnap());

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });

      const func = async () => {
        if (!api.canScrollNext()) {
          const recursion = async () => {
            const { error, res } = await fetcher("http://localhost:3000/api/users");

            if (!error) {
              const additionalUsers = (await res?.json()) as Users;
              setUsers((prev) => {
                return {
                  isLikes: [...prev.isLikes, ...additionalUsers.isLikes],
                  portraitCards: [...prev.portraitCards, ...additionalUsers.portraitCards],
                };
              });
            } else {
              toast({
                action: (
                  <ToastAction altText="再取得" onClick={() => void recursion()}>
                    再取得
                  </ToastAction>
                ),
                title: "追加のデータ取得に失敗しました。",
                variant: "destructive",
              });
            }
          };
          await recursion();
        }
      };
      api.on("settle", () => void func());
    }
  }, [api]);

  return (
    <Carousel className="flex" orientation="vertical" setApi={setApi}>
      <CarouselContent className="h-[80vh] w-[448px]">
        {users.portraitCards.map((portraitCard, index) => (
          <CarouselItem key={index}>
            <PortraitCard {...portraitCard} />
          </CarouselItem>
        ))}
        <CarouselItem>
          <PortraitCardSkeleton />
        </CarouselItem>
      </CarouselContent>
      <PortraitMenubar current={current} isLikes={users.isLikes} setUsers={setUsers} />
    </Carousel>
  );
};
