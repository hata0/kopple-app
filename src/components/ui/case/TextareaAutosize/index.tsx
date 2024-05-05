import { forwardRef } from "react";
import TextareaAutosizePrimitive, { type TextareaAutosizeProps } from "react-textarea-autosize";

import { cn } from "@/lib/utils";

export const TextareaAutosize = forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>(
  ({ className, ...props }, ref) => {
    return (
      <TextareaAutosizePrimitive
        ref={ref}
        className={cn(
          "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);
TextareaAutosize.displayName = "TextareaAutosize";
