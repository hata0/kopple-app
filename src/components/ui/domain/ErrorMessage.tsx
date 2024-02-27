import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Props = { children: ReactNode; className?: string };

export const ErrorMessage = ({ children, className }: Props) => {
  return (
    children && (
      <div className={cn("text-sm font-medium text-destructive", className)}>{children}</div>
    )
  );
};
