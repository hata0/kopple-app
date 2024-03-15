/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

import { type Tag as TagType, TagInputProps } from "./TagInput";

import { Button } from "@/components/shadcn/ui/button";
import { cn } from "@/lib/utils";

export const tagVariants = cva(
  "transition-all border inline-flex items-center text-sm pl-2 rounded-md",
  {
    defaultVariants: {
      animation: "fadeIn",
      borderStyle: "default",
      interaction: "nonClickable",
      shape: "default",
      size: "md",
      textCase: "capitalize",
      textStyle: "normal",
      variant: "default",
    },
    variants: {
      animation: {
        bounce: "animate-bounce",
        fadeIn: "animate-fadeIn",
        none: "",
        slideIn: "animate-slideIn",
      },
      borderStyle: {
        default: "border-solid",
        none: "border-none",
      },
      interaction: {
        clickable: "cursor-pointer hover:shadow-md",
        nonClickable: "cursor-default",
      },
      shape: {
        default: "rounded-sm",
        pill: "rounded-full",
        rounded: "rounded-lg",
        square: "rounded-none",
      },
      size: {
        lg: "text-base h-9",
        md: "text-sm h-8",
        sm: "text-xs h-7",
        xl: "text-lg h-10",
      },
      textCase: {
        capitalize: "capitalize",
        lowercase: "lowercase",
        uppercase: "uppercase",
      },
      textStyle: {
        bold: "font-bold",
        italic: "italic",
        lineThrough: "line-through",
        normal: "font-normal",
        underline: "underline",
      },
      variant: {
        default: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "bg-destructive border-destructive text-destructive-foreground hover:bg-destructive/90",
        primary: "bg-primary border-primary text-primary-foreground hover:bg-primary/90",
      },
    },
  },
);

export type TagProps = {
  tagObj: TagType;
  variant: TagInputProps["variant"];
  size: TagInputProps["size"];
  shape: TagInputProps["shape"];
  borderStyle: TagInputProps["borderStyle"];
  textCase: TagInputProps["textCase"];
  interaction: TagInputProps["interaction"];
  animation: TagInputProps["animation"];
  textStyle: TagInputProps["textStyle"];
  onRemoveTag: (id: string) => void;
} & Pick<TagInputProps, "direction" | "onTagClick" | "draggable">;

export const Tag: React.FC<TagProps> = ({
  animation,
  borderStyle,
  direction,
  draggable,
  interaction,
  onRemoveTag,
  onTagClick,
  shape,
  size,
  tagObj,
  textCase,
  textStyle,
  variant,
}) => {
  return (
    <span
      key={tagObj.id}
      className={cn(
        tagVariants({
          animation,
          borderStyle,
          interaction,
          shape,
          size,
          textCase,
          textStyle,
          variant,
        }),
        {
          "cursor-pointer": draggable,
          "justify-between": direction === "column",
        },
      )}
      draggable={draggable}
      onClick={() => onTagClick?.(tagObj)}
    >
      {tagObj.text}
      <Button
        className={cn("h-full px-3 py-1 hover:bg-transparent")}
        onClick={(e) => {
          e.stopPropagation(); // Prevent event from bubbling up to the tag span
          onRemoveTag(tagObj.id);
        }}
        type="button"
        variant="ghost"
      >
        <X size={14} />
      </Button>
    </span>
  );
};
