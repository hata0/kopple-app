import { Tag, type Tag as TagType, TagProps } from "../Tag";

type Props = {
  tags: TagType[];
} & Omit<TagProps, "name" | "id">;

export const TagList = ({ tags, ...tagProps }: Props) => {
  return (
    <div className="flex h-[52px] w-full items-center space-x-1 rounded-md border border-border px-3 py-2">
      {tags.map((tag, idx) => (
        <Tag key={idx} {...tag} {...tagProps} />
      ))}
    </div>
  );
};
