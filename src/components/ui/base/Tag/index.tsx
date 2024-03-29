import { ComponentProps } from "react";
import { ImCross } from "react-icons/im";

import { Button, ButtonProps } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

export type Tag = {
  name: string;
  id: string;
};
export type TagProps = {
  onDeleteTag: (idToDelete: string) => void;
  containerProps?: ComponentProps<"div">;
  deleteProps?: Omit<ButtonProps, "onClick">;
  nameProps?: ComponentProps<"span">;
} & Tag;

export const Tag = ({
  containerProps,
  deleteProps,
  id,
  name,
  nameProps,
  onDeleteTag,
}: TagProps) => {
  return (
    <div
      {...containerProps}
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-cyan-500 text-primary-foreground transition-colors hover:bg-cyan-500/90",
        containerProps?.className,
      )}
    >
      <span
        {...nameProps}
        className={cn("flex h-full items-center py-1 pl-2 pr-3 font-medium", nameProps?.className)}
      >
        {name}
      </span>
      <Button
        {...deleteProps}
        aria-label={`「${name}」を削除`}
        className={cn(
          "ml-0.5 h-full w-4 bg-transparent py-2 pl-0 pr-2 transition-colors hover:bg-transparent hover:text-red-500",
          deleteProps?.className,
        )}
        onClick={() => onDeleteTag(id)}
        type="button"
      >
        <ImCross />
      </Button>
    </div>
  );
};
