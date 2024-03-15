import Image from "next/image";
import { memo } from "react";

import { PortraitCard as Props } from "../../types/PortraitCard";

import { Card, CardContent } from "@/components/shadcn/ui/card";

export const PortraitCard = memo(({ age, hashtag, imageUrl, message, name }: Props) => {
  return (
    <Card className="h-full">
      <CardContent className="h-full p-0">
        <div className="relative h-full w-full">
          <Image
            fill
            priority
            alt="ポートレイト"
            className="object-contain"
            sizes="(max-width: 900px) 100vw, (max-width: 1350px) 50vw, 33vw"
            src={imageUrl}
          />
          <div className="absolute bottom-[8px] left-[8px]">
            <div className="flex items-end justify-start space-x-[8px]">
              <div className="text-xl font-bold text-foreground">{name}</div>
              <div className="font-medium text-foreground">{age}</div>
            </div>
            <div className="text-sm text-foreground">{message}</div>
            <div className="text-sm text-foreground">{hashtag}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

PortraitCard.displayName = "PortraitCard";
