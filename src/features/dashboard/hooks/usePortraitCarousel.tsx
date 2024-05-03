import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { PortraitCard } from "../types/PortraitCard";

import { CarouselApi } from "@/components/shadcn/ui/carousel";
import { ToastAction } from "@/components/shadcn/ui/toast";
import { toast } from "@/components/shadcn/ui/use-toast";
import { MOCK_API_URL } from "@/constants/mockApiUrl";
import { fetcher } from "@/utils/fetcher";

export const usePortraitCarousel = () => {
  const { data: portraitCards, mutate } = useSWR<PortraitCard[]>("/portraits");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const router = useRouter();

  useEffect(() => {
    if (api) {
      setCurrent(api.selectedScrollSnap());

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });

      const func = async () => {
        if (!api.canScrollNext()) {
          const recursion = async () => {
            const { error, res } = await fetcher(`${MOCK_API_URL}/portraits`);

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
                title: "ログインできていません。再度ログインしてください",
                variant: "destructive",
              });
              await router.replace("/sign-in");
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
  }, [api, mutate, portraitCards, router]);

  return {
    current,
    portraitCards,
    setApi,
  };
};
