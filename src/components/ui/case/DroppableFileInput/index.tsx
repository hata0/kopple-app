import { ReactNode } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Input } from "@/components/shadcn/ui/input";

export type DropState = {
  isDragActive: boolean;
};

type Props = {
  className?: (args: DropState) => string;
  render: (args: DropState) => ReactNode;
  dropOptions: DropzoneOptions;
};
export const DroppableFileInput = ({ className, dropOptions, render }: Props) => {
  const { getInputProps, getRootProps, isDragActive } = useDropzone(dropOptions);

  return (
    <div {...getRootProps()} className={className?.({ isDragActive })}>
      <Input {...getInputProps()} data-testid="drop-input" />
      {render({ isDragActive })}
    </div>
  );
};
