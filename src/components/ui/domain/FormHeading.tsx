import { ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<"h2">, "ref">;

export const FormHeading = forwardRef<HTMLHeadingElement, Props>(
  ({ className, ...rest }, forwardRef) => {
    return <h2 className={cn("font-medium leading-none", className)} {...rest} ref={forwardRef} />;
  },
);

FormHeading.displayName = "FormHeading";
