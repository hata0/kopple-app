import { ComponentPropsWithoutRef, forwardRef } from "react";

import { cn } from "@/lib/utils";

type Props = ComponentPropsWithoutRef<"legend">;

export const FormLegend = forwardRef<HTMLLegendElement, Props>(
  ({ className, ...rest }, forwardRef) => {
    return (
      <legend ref={forwardRef} className={cn("font-medium leading-none", className)} {...rest} />
    );
  },
);

FormLegend.displayName = "FormLegend";
