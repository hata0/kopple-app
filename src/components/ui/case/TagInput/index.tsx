import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { Tag } from "../Tag";
import { TagList } from "../TagList";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";
import { toast } from "@/components/shadcn/ui/use-toast";

type Props = {
  tags: Tag[];
};

export const TagInput = ({ tags: initialTags }: Props) => {
  // TODO: 後で削除
  const [tags, setTags] = useState(initialTags);
  const [text, setText] = useState("");

  // TODO: 後で削除
  const onAddTag = () => {
    setTags((prev) => [...prev, { id: crypto.randomUUID(), name: text }]);
  };

  const handleAddTag = () => {
    if (!tags.find(({ name }) => name === text)) {
      // TODO: この中で引数の関数を呼び出して処理する
      onAddTag();

      setText("");
    } else {
      toast({
        title: "同じ名前のタグは設定できません",
        variant: "destructive",
      });
    }
  };

  const handleDeleteTag = (idToDelete: string) => {
    setTags((prev) => prev.filter(({ id }) => id !== idToDelete));
  };

  return (
    <div className="flex h-[52px] justify-center space-x-2">
      <TagList onDeleteTag={handleDeleteTag} tags={tags} />
      <div className="flex h-full items-center justify-center space-x-2">
        <Input
          className="w-40"
          onChange={(e) => setText(e.target.value)}
          placeholder="タグを追加する"
          value={text}
        />
        <Button
          aria-label="追加"
          disabled={text === ""}
          onClick={handleAddTag}
          size="icon"
          type="button"
        >
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};
