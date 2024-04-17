import Image from "next/image";
import { memo, ReactNode } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaPortrait } from "react-icons/fa";

import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";

import { toast } from "@/components/shadcn/ui/use-toast";
import { DroppableFileInput } from "@/components/ui/case/DroppableFileInput";
import { cn } from "@/lib/utils";

type Props = {
  setValue: UseFormSetValue<ProfileFormInput>;
  imageUrl: string | null;
  value: File | undefined;
  render: (children: ReactNode) => ReactNode;
};
export const PortraitInput = memo(({ imageUrl, render, setValue, value }: Props) => {
  return (
    <DroppableFileInput
      className={({ isDragActive }) =>
        cn("h-[300px] w-[224px] cursor-pointer", {
          "bg-accent": isDragActive,
        })
      }
      dropOptions={{
        accept: {
          "image/png": [".png", ".jpg"],
        },
        onDropAccepted: (files) => {
          setValue("image", files[0]);
        },
        onDropRejected: () => {
          toast({
            title: "ファイルは画像である必要があります",
            variant: "destructive",
          });
        },
      }}
      render={({ isDragActive }) =>
        render(
          !imageUrl && !value ? (
            <div
              aria-label="ポートレイトは設定されていません"
              className={cn(
                "flex h-full w-full items-center justify-center rounded-md border-2 border-dashed bg-accent text-accent-foreground hover:bg-gray-100 hover:text-accent-foreground/80",
                {
                  "bg-gray-100 text-accent-foreground/80": isDragActive,
                },
              )}
            >
              <FaPortrait className="h-16 w-16" />
            </div>
          ) : (
            <div className="relative h-full w-full rounded-md border-2 hover:bg-accent">
              <Image
                fill
                priority
                alt="ポートレイト"
                className={cn("object-contain hover:opacity-50", {
                  "opacity-50": isDragActive,
                })}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                src={value ? URL.createObjectURL(value) : imageUrl!}
              />
            </div>
          ),
        )
      }
    />
  );
});
PortraitInput.displayName = "PortraitInput";
