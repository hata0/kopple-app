import { ComponentProps, forwardRef } from "react";

import { cn } from "@/lib/utils";

type Props = Omit<ComponentProps<"legend">, "ref">;

export const FormLegend = forwardRef<HTMLLegendElement, Props>(
  ({ className, ...rest }, forwardRef) => {
    return (
      <legend ref={forwardRef} className={cn("font-medium leading-none", className)} {...rest} />
    );
  },
);

FormLegend.displayName = "FormLegend";
