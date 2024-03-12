import { type VariantProps } from "class-variance-authority";
import React from "react";

import { Autocomplete } from "./AutoComplete";
import { tagVariants } from "./Tag";
import { TagList } from "./TagList";
import { TagPopover } from "./TagPopover";

import { Button } from "@/components/ui/button";
import { CommandInput } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export enum Delimiter {
  Comma = ",",
  Enter = "Enter",
  Space = " ",
}

type OmittedInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "value">;

export type Tag = {
  id: string;
  text: string;
};

export interface TagInputProps extends OmittedInputProps, VariantProps<typeof tagVariants> {
  placeholder?: string;
  tags: Tag[];
  setTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  enableAutocomplete?: boolean;
  autocompleteOptions?: Tag[];
  maxTags?: number;
  minTags?: number;
  readOnly?: boolean;
  disabled?: boolean;
  onTagAdd?: (tag: string) => void;
  onTagRemove?: (tag: string) => void;
  allowDuplicates?: boolean;
  validateTag?: (tag: string) => boolean;
  delimiter?: Delimiter;
  showCount?: boolean;
  placeholderWhenFull?: string;
  sortTags?: boolean;
  delimiterList?: string[];
  truncate?: number;
  minLength?: number;
  maxLength?: number;
  usePopoverForTags?: boolean;
  value?: string | number | readonly string[] | { id: string; text: string }[];
  autocompleteFilter?: (option: string) => boolean;
  direction?: "row" | "column";
  onInputChange?: (value: string) => void;
  customTagRenderer?: (tag: Tag) => React.ReactNode;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onTagClick?: (tag: Tag) => void;
  draggable?: boolean;
  inputFieldPostion?: "bottom" | "top" | "inline";
  clearAll?: boolean;
  onClearAll?: () => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  restrictTagsToAutocompleteOptions?: boolean;
}

const TagInput = React.forwardRef<HTMLInputElement, TagInputProps>((props) => {
  const {
    allowDuplicates,
    animation,
    autocompleteFilter,
    autocompleteOptions,
    borderStyle,
    className,
    clearAll = false,
    customTagRenderer,
    delimiter = Delimiter.Comma,
    delimiterList,
    direction = "row",
    draggable = false,
    enableAutocomplete,
    id,
    inputFieldPostion = "bottom",
    inputProps = {},
    interaction,
    maxLength,
    maxTags,
    minLength,
    onBlur,
    onClearAll,
    onFocus,
    onInputChange,
    onTagAdd,
    onTagClick,
    onTagRemove,
    placeholder,
    placeholderWhenFull = "Max tags reached",
    restrictTagsToAutocompleteOptions,
    setTags,
    shape,
    showCount,
    size,
    sortTags,
    tags,
    textCase,
    textStyle,
    truncate,
    usePopoverForTags = false,
    validateTag,
    variant,
  } = props;

  const [inputValue, setInputValue] = React.useState("");
  const [tagCount, setTagCount] = React.useState(Math.max(0, tags.length));
  const inputRef = React.useRef<HTMLInputElement>(null);

  if (
    (maxTags !== undefined && maxTags < 0) ||
    (props.minTags !== undefined && props.minTags < 0)
  ) {
    console.warn("maxTags and minTags cannot be less than 0");
    toast({
      description: "Please set maxTags and minTags to a value greater than or equal to 0",
      title: "maxTags and minTags cannot be less than 0",
      variant: "destructive",
    });
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onInputChange?.(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      delimiterList
        ? delimiterList.includes(e.key)
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
          e.key === delimiter || e.key === Delimiter.Enter
    ) {
      e.preventDefault();
      const newTagText = inputValue.trim();

      // Check if the tag is in the autocomplete options if restrictTagsToAutocomplete is true
      if (
        restrictTagsToAutocompleteOptions &&
        !autocompleteOptions?.some((option) => option.text === newTagText)
      ) {
        toast({
          description: "Please select a tag from the autocomplete options.",
          title: "Invalid Tag",
          variant: "destructive",
        });
        return;
      }

      if (validateTag && !validateTag(newTagText)) {
        return;
      }

      if (minLength && newTagText.length < minLength) {
        console.warn("Tag is too short");
        toast({
          description: "Please enter a tag with more characters",
          title: "Tag is too short",
          variant: "destructive",
        });
        return;
      }

      // Validate maxLength
      if (maxLength && newTagText.length > maxLength) {
        toast({
          description: "Please enter a tag with less characters",
          title: "Tag is too long",
          variant: "destructive",
        });
        console.warn("Tag is too long");
        return;
      }

      const newTagId = crypto.randomUUID();

      if (
        newTagText &&
        (allowDuplicates || !tags.some((tag) => tag.text === newTagText)) &&
        (maxTags === undefined || tags.length < maxTags)
      ) {
        setTags([...tags, { id: newTagId, text: newTagText }]);
        onTagAdd?.(newTagText);
        setTagCount((prevTagCount) => prevTagCount + 1);
      }
      setInputValue("");
    }
  };

  const removeTag = (idToRemove: string) => {
    setTags(tags.filter((tag) => tag.id !== idToRemove));
    onTagRemove?.(tags.find((tag) => tag.id === idToRemove)?.text || "");
    setTagCount((prevTagCount) => prevTagCount - 1);
  };

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    setTags((currentTags) => {
      const newTags = [...currentTags];
      const [removedTag] = newTags.splice(oldIndex, 1);
      newTags.splice(newIndex, 0, removedTag);

      return newTags;
    });
  };

  const handleClearAll = () => {
    onClearAll?.();
  };

  const filteredAutocompleteOptions = autocompleteFilter
    ? autocompleteOptions?.filter((option) => autocompleteFilter(option.text))
    : autocompleteOptions;

  const displayedTags = sortTags ? [...tags].sort() : tags;

  const truncatedTags = truncate
    ? tags.map((tag) => ({
        id: tag.id,
        text: tag.text?.length > truncate ? `${tag.text.substring(0, truncate)}...` : tag.text,
      }))
    : displayedTags;

  return (
    <div
      className={`flex w-full gap-3 ${
        inputFieldPostion === "bottom"
          ? "flex-col"
          : inputFieldPostion === "top"
            ? "flex-col-reverse"
            : "flex-row"
      }`}
    >
      {!usePopoverForTags ? (
        <TagList
          animation={animation}
          borderStyle={borderStyle}
          customTagRenderer={customTagRenderer}
          direction={direction}
          draggable={draggable}
          interaction={interaction}
          onRemoveTag={removeTag}
          onSortEnd={onSortEnd}
          onTagClick={onTagClick}
          shape={shape}
          size={size}
          tags={truncatedTags}
          textCase={textCase}
          textStyle={textStyle}
          variant={variant}
        />
      ) : null}
      {enableAutocomplete ? (
        <div className="w-full max-w-[450px]">
          <Autocomplete
            allowDuplicates={allowDuplicates ?? false}
            autocompleteOptions={filteredAutocompleteOptions as Tag[]}
            maxTags={maxTags}
            onTagAdd={onTagAdd}
            setTags={setTags}
            tags={tags}
          >
            {!usePopoverForTags ? (
              <CommandInput
                ref={inputRef}
                className="w-full"
                disabled={maxTags !== undefined && tags.length >= maxTags}
                onBlur={onBlur}
                onChangeCapture={handleInputChange}
                onFocus={onFocus}
                onKeyDown={handleKeyDown}
                placeholder={
                  maxTags !== undefined && tags.length >= maxTags
                    ? placeholderWhenFull
                    : placeholder
                }
                value={inputValue}
              />
            ) : (
              <TagPopover
                animation={animation}
                borderStyle={borderStyle}
                customTagRenderer={customTagRenderer}
                direction={direction}
                draggable={draggable}
                interaction={interaction}
                onRemoveTag={removeTag}
                onSortEnd={onSortEnd}
                onTagClick={onTagClick}
                shape={shape}
                size={size}
                tags={truncatedTags}
                textCase={textCase}
                textStyle={textStyle}
                variant={variant}
              >
                <CommandInput
                  ref={inputRef}
                  className="w-full"
                  disabled={maxTags !== undefined && tags.length >= maxTags}
                  onBlur={onBlur}
                  onChangeCapture={handleInputChange}
                  onFocus={onFocus}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    maxTags !== undefined && tags.length >= maxTags
                      ? placeholderWhenFull
                      : placeholder
                  }
                  value={inputValue}
                />
              </TagPopover>
            )}
          </Autocomplete>
        </div>
      ) : (
        <div className="w-full">
          {!usePopoverForTags ? (
            <Input
              ref={inputRef}
              id={id}
              onBlur={onBlur}
              onChange={handleInputChange}
              onFocus={onFocus}
              onKeyDown={handleKeyDown}
              placeholder={
                maxTags !== undefined && tags.length >= maxTags ? placeholderWhenFull : placeholder
              }
              type="text"
              value={inputValue}
              {...inputProps}
              autoComplete={enableAutocomplete ? "on" : "off"}
              className={className}
              disabled={maxTags !== undefined && tags.length >= maxTags}
              list={enableAutocomplete ? "autocomplete-options" : undefined}
            />
          ) : (
            <TagPopover
              animation={animation}
              borderStyle={borderStyle}
              customTagRenderer={customTagRenderer}
              direction={direction}
              draggable={draggable}
              interaction={interaction}
              onRemoveTag={removeTag}
              onSortEnd={onSortEnd}
              onTagClick={onTagClick}
              shape={shape}
              size={size}
              tags={truncatedTags}
              textCase={textCase}
              textStyle={textStyle}
              variant={variant}
            >
              <Input
                ref={inputRef}
                id={id}
                onBlur={onBlur}
                onChange={handleInputChange}
                onFocus={onFocus}
                onKeyDown={handleKeyDown}
                placeholder={
                  maxTags !== undefined && tags.length >= maxTags
                    ? placeholderWhenFull
                    : placeholder
                }
                type="text"
                value={inputValue}
                {...inputProps}
                autoComplete={enableAutocomplete ? "on" : "off"}
                className={className}
                disabled={maxTags !== undefined && tags.length >= maxTags}
                list={enableAutocomplete ? "autocomplete-options" : undefined}
              />
            </TagPopover>
          )}
        </div>
      )}
      {showCount && maxTags && (
        <div className="flex">
          <span className="ml-auto mt-1 text-sm text-muted-foreground">
            {`${tagCount}`}/{`${maxTags}`}
          </span>
        </div>
      )}
      {clearAll && (
        <Button className="mt-2" onClick={handleClearAll} type="button">
          Clear All
        </Button>
      )}
    </div>
  );
});

TagInput.displayName = "TagInput";

export { TagInput };
