import { ClassValue } from "clsx";
import { ReactNode } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Input } from "@/components/shadcn/ui/input";
import { cn } from "@/lib/utils";

export type RenderArgs = {
  isDragActive: boolean;
};

type Props = {
  className?: string;
  classNames?: {
    dragActive: ClassValue[];
  };
  render: ({ isDragActive }: RenderArgs) => ReactNode;
  dropOptions: DropzoneOptions;
};
export const DroppableFileInput = ({ className, classNames, dropOptions, render }: Props) => {
  const { getInputProps, getRootProps, isDragActive } = useDropzone(dropOptions);

  return (
    <div {...getRootProps()} className={cn(className, classNames?.dragActive)}>
      <Input {...getInputProps()} data-testid="drop-input" />
      {render({ isDragActive })}
    </div>
  );
};
