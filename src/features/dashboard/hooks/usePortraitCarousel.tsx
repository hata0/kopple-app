import { useEffect, useState } from "react";
import useSWR from "swr";

import { Users } from "../types/Users";

import { CarouselApi } from "@/components/ui/carousel";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

export const usePortraitCarousel = () => {
  const { data: users, mutate } = useSWR<Users>("/users");
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
            const { error, res } = await fetcher(`${BACKEND_URL}/users`);

            if (!error) {
              const additionalUsers = (await res?.json()) as Users;
              await mutate(
                {
                  isLikes: [...users!.isLikes, ...additionalUsers.isLikes],
                  portraitCards: [...users!.portraitCards, ...additionalUsers.portraitCards],
                },
                false,
              );
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
  }, [api, mutate, users]);

  return {
    current,
    setApi,
    users,
  };
};
