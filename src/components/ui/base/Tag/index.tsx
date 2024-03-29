import { ImCross } from "react-icons/im";

import { Button } from "@/components/shadcn/ui/button";

export type Tag = {
  name: string;
  id: string;
};
export type TagProps = {
  onDeleteTag: (idToDelete: string) => void;
} & Tag;

export const Tag = ({ id, name, onDeleteTag }: TagProps) => {
  return (
    <div className="inline-flex items-center justify-center space-x-2 rounded-md bg-cyan-500 px-2 py-1 text-primary-foreground transition-colors hover:bg-cyan-500/90">
      <span className="flex h-full items-center font-medium">{name}</span>
      <Button
        aria-label={`「${name}」を削除`}
        className="ml-0.5 h-4 w-4 bg-transparent p-1 transition-colors hover:bg-transparent hover:text-red-500"
        onClick={() => onDeleteTag(id)}
        type="button"
      >
        <ImCross />
      </Button>
    </div>
  );
};
