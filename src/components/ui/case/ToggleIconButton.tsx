import { MouseEventHandler, ReactNode } from "react";

import { Button } from "../button";

type Props = {
  render: (className: string) => ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isPressed: boolean;
  ariaLabel: string;
};

export const ToggleIconButton = ({ ariaLabel, isPressed, onClick, render }: Props) => {
  return (
    <Button
      aria-label={ariaLabel}
      className={
        isPressed
          ? "group rounded-full bg-black hover:bg-black hover:opacity-80"
          : "group rounded-full"
      }
      onClick={onClick}
      size="icon"
      variant="outline"
    >
      {render(
        isPressed
          ? "bg-black text-white transition-colors group-hover:opacity-80"
          : "transition-colors group-hover:bg-accent group-hover:text-accent-foreground",
      )}
    </Button>
  );
};
