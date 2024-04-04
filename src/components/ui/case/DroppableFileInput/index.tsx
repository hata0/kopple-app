import { ReactNode } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Input, InputProps } from "@/components/shadcn/ui/input";

export type DropState = {
  isDragActive: boolean;
};

type Props = {
  className?: (args: DropState) => string;
  inputProps?: InputProps & {
    ["data-testid"]: string;
  };
  render: (args: DropState) => ReactNode;
  dropOptions: DropzoneOptions;
};
export const DroppableFileInput = ({ className, dropOptions, inputProps, render }: Props) => {
  const { getInputProps, getRootProps, isDragActive } = useDropzone(dropOptions);

  return (
    <div {...getRootProps()} className={className?.({ isDragActive })}>
      <Input {...getInputProps()} data-testid="drop-input" {...inputProps} />
      {render({ isDragActive })}
    </div>
  );
};
