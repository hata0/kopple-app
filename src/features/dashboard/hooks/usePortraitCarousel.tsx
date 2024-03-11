import { useEffect, useState } from "react";
import useSWR from "swr";

import { PortraitCard } from "../types/PortraitCard";

import { CarouselApi } from "@/components/ui/carousel";
import { ToastAction } from "@/components/ui/toast";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcherWithAuth } from "@/utils/fetcherWithAuth";

export const usePortraitCarousel = () => {
  const { data: portraitCards, mutate } = useSWR<PortraitCard[]>("/portraits");
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
            const { error, res } = await fetcherWithAuth(`${BACKEND_URL}/portraits`);

            if (error) {
              toast({
                action: (
                  <ToastAction altText="再取得" onClick={() => void recursion()}>
                    再取得
                  </ToastAction>
                ),
                title: "追加のデータ取得に失敗しました。",
                variant: "destructive",
              });
            } else if (res?.status === 401) {
              toast({
                title: "ログインできていません",
                variant: "destructive",
              });
            } else {
              const additionalPortraitCards = (await res?.json()) as PortraitCard[];
              await mutate([...portraitCards!, ...additionalPortraitCards], false);
            }
          };
          await recursion();
        }
      };
      api.on("settle", () => void func());
    }
  }, [api, mutate, portraitCards]);

  return {
    current,
    portraitCards,
    setApi,
  };
};
