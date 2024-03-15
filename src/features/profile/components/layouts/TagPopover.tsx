import React from "react";

import { type Tag as TagType } from "./TagInput";
import { TagList, TagListProps } from "./TagList";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/ui/popover";

type TagPopoverProps = {
  children: React.ReactNode;
  tags: TagType[];
  customTagRenderer?: (tag: TagType) => React.ReactNode;
} & TagListProps;

export const TagPopover: React.FC<TagPopoverProps> = ({
  children,
  customTagRenderer,
  tags,
  ...tagProps
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-full max-w-[450px] space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-medium leading-none">Entered Tags</h4>
          <p className="text-left text-sm text-muted-foreground">
            These are the tags you&apos;ve entered.
          </p>
        </div>
        <TagList customTagRenderer={customTagRenderer} tags={tags} {...tagProps} />
      </PopoverContent>
    </Popover>
  );
};
