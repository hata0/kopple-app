import { ComponentProps, ReactNode } from "react";
import { type DropzoneOptions, useDropzone } from "react-dropzone";

import { Input, InputProps } from "@/components/shadcn/ui/input";

export type DropState = {
  isDragActive: boolean;
};

type Props = {
  className?: (args: DropState) => string;
  containerProps?: Omit<ComponentProps<"div">, "className">;
  inputProps?: InputProps & {
    ["data-testid"]: string;
  };
  render: (args: DropState) => ReactNode;
  dropOptions: DropzoneOptions;
};
export const DroppableFileInput = ({
  className,
  containerProps,
  dropOptions,
  inputProps,
  render,
}: Props) => {
  const { getInputProps, getRootProps, isDragActive } = useDropzone(dropOptions);

  return (
    <div
      {...getRootProps()}
      className={className?.({ isDragActive })}
      data-testid="drop-container"
      {...containerProps}
    >
      <Input {...getInputProps()} data-testid="drop-input" {...inputProps} />
      {render({ isDragActive })}
    </div>
  );
};
