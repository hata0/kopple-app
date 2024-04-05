import Image from "next/image";
import { memo } from "react";
import { UseFormSetValue } from "react-hook-form";
import { FaPortrait } from "react-icons/fa";

import { ProfileFormInput } from "../../services/backend/profiles/[id]/type";

import { FormControl } from "@/components/shadcn/ui/form";
import { toast } from "@/components/shadcn/ui/use-toast";
import { DroppableFileInput } from "@/components/ui/case/DroppableFileInput";
import { cn } from "@/lib/utils";

type Props = {
  setValue: UseFormSetValue<ProfileFormInput>;
  imageUrl: string | null;
  value: File | undefined;
};
export const PortraitFormControl = memo(({ imageUrl, setValue, value }: Props) => {
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
          if (files.length > 0) {
            setValue("image", files[0]);
          } else {
            toast({
              title: "画像のアップロードに失敗しました",
              variant: "destructive",
            });
          }
        },
        onDropRejected: () => {
          toast({
            title: "ファイルは画像である必要があります",
            variant: "destructive",
          });
        },
      }}
      render={({ isDragActive }) => (
        <FormControl>
          {!imageUrl && !value ? (
            <div
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
          )}
        </FormControl>
      )}
    />
  );
});
PortraitFormControl.displayName = "PortraitInput";
