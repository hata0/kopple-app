export const createDtWithFiles = (files: File[] = []) => {
  return {
    dataTransfer: {
      files,
      items: files.map((file) => ({
        getAsFile: () => file,
        kind: "file",
        size: file.size,
        type: file.type,
      })),
      types: ["Files"],
    },
  };
};
