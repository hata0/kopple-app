import { MouseEventHandler } from "react";
import { ImCross } from "react-icons/im";

import { Button } from "@/components/shadcn/ui/button";

type Props = {
  name: string;
  onDeleteTag: MouseEventHandler<HTMLButtonElement>;
};

export const Tag = ({ name, onDeleteTag }: Props) => {
  return (
    <div className="inline-flex items-center justify-center space-x-2 rounded-md bg-primary px-2 py-1 text-primary-foreground transition-colors hover:bg-primary/90">
      <span className="flex h-full items-center">{name}</span>
      <Button
        aria-label="削除"
        className="ml-0.5 h-4 w-4 bg-transparent p-1 hover:bg-transparent"
        onClick={onDeleteTag}
      >
        <ImCross />
      </Button>
    </div>
  );
};
