import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ImCross } from "react-icons/im";

import { Button } from "@/components/shadcn/ui/button";
import { Input } from "@/components/shadcn/ui/input";

export const TagInput = () => {
  // TODO: 後で削除
  const [tags, setTags] = useState<string[]>([]);
  const [text, setText] = useState("");

  const handleAddTag = () => {
    // TODO: この中で関数を呼び出して処理する
    setTags((prev) => [...prev, text]);
    setText("");
  };

  return (
    <div className="flex h-[52px] justify-center space-x-2">
      <div className="flex w-full items-center space-x-1 rounded-md border border-border px-3 py-2">
        {tags.map((tag, idx) => (
          <div
            key={idx}
            className="flex items-center justify-center space-x-2 rounded-md bg-primary px-2 py-1 text-primary-foreground hover:bg-primary/90"
          >
            <div className="flex h-full items-center">{tag}</div>
            <Button className="ml-0.5 h-4 w-4 bg-transparent p-1 hover:bg-transparent">
              <ImCross />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex h-full items-center justify-center space-x-2">
        <Input className="w-40" onChange={(e) => setText(e.target.value)} value={text} />
        <Button aria-label="追加" disabled={text === ""} onClick={handleAddTag} size="icon">
          <FaPlus />
        </Button>
      </div>
    </div>
  );
};
