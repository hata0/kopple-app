import React from "react";

import { type Tag as TagType } from "./TagInput";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

type AutocompleteProps = {
  tags: TagType[];
  setTags: React.Dispatch<React.SetStateAction<TagType[]>>;
  autocompleteOptions: TagType[];
  maxTags?: number;
  onTagAdd?: (tag: string) => void;
  allowDuplicates: boolean;
  children: React.ReactNode;
};

export const Autocomplete: React.FC<AutocompleteProps> = ({
  allowDuplicates,
  autocompleteOptions,
  children,
  maxTags,
  onTagAdd,
  setTags,
  tags,
}) => {
  return (
    <Command className="min-w-[400px] border">
      {children}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          {autocompleteOptions.map((option) => (
            <CommandItem key={option.id}>
              <div
                className="w-full"
                onClick={() => {
                  if (maxTags && tags.length >= maxTags) return;
                  if (!allowDuplicates && tags.some((tag) => tag.text === option.text)) return;
                  setTags([...tags, option]);
                  onTagAdd?.(option.text);
                }}
              >
                {option.text}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
