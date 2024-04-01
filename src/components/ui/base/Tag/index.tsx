import { ComponentProps } from "react";
import { ImCross } from "react-icons/im";

import { Button, ButtonProps } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";
import { Tag as TagType } from "@/types/Tag";

export type TagProps = {
  value: TagType;
  index: number;
  onDeleteTag?: (deleteIndex: number) => void;
  containerProps?: ComponentProps<"div">;
  deleteProps?: Omit<ButtonProps, "onClick">;
  nameProps?: ComponentProps<"span">;
};

export const Tag = ({
  containerProps,
  deleteProps,
  index,
  nameProps,
  onDeleteTag,
  value,
}: TagProps) => {
  return (
    <div
      {...containerProps}
      className={cn(
        "inline-flex h-8 items-center justify-center text-nowrap rounded-md bg-cyan-500 text-primary-foreground transition-colors hover:bg-cyan-500/90",
        containerProps?.className,
      )}
    >
      <span
        {...nameProps}
        className={cn("flex h-full items-center py-1 pl-2 pr-3 font-medium", nameProps?.className)}
      >
        {value.name}
      </span>
      <Button
        {...deleteProps}
        aria-label={`「${value.name}」を削除`}
        className={cn(
          "ml-0.5 h-full w-4 bg-transparent py-2 pl-0 pr-2 ring-offset-transparent transition-colors hover:bg-transparent hover:text-red-500 focus-visible:ring-1 focus-visible:ring-cyan-600/80",
          deleteProps?.className,
        )}
        onClick={() => onDeleteTag?.(index)}
        type="button"
      >
        <ImCross />
      </Button>
    </div>
  );
};
