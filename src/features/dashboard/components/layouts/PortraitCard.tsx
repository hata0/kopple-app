import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

type Props = {
  imageUrl: string;
  name: string;
  age: number;
  message: string;
  hashtag: string;
};

export const PortraitCard = ({ age, hashtag, imageUrl, message, name }: Props) => {
  return (
    <Card className="h-full">
      <CardContent className="h-full p-0">
        <div className="relative h-full w-full">
          <Image
            fill
            priority
            alt="portrait"
            className="object-contain"
            sizes="100vw"
            src={imageUrl}
          />
          <div className="absolute bottom-[8px] left-[8px]">
            <div className="flex items-end justify-center space-x-[8px]">
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
};
