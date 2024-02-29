import Image from "next/image";

import { Card, CardContent } from "@/components/ui/card";

export const PortraitCard = () => {
  return (
    <Card className="h-full">
      <CardContent className="h-full p-0">
        <div className="relative h-full w-full">
          <Image fill alt="portrait1" className="object-contain" src="/portrait1.png" />
          <div className="absolute bottom-[8px] left-[8px]">
            <div className="flex items-end justify-center space-x-[8px]">
              <div className="text-xl font-bold text-foreground">名前</div>
              <div className="font-medium text-foreground">年齢</div>
            </div>
            <div className="text-sm text-foreground">ひとこと</div>
            <div className="text-sm text-foreground">ハッシュタグ</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
