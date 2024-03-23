import { ReactNode, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { Button } from "../../../shadcn/ui/button";

type Props = {
  render: (inputProps: { className: string; type: string }) => ReactNode;
  isPasswordShown?: boolean;
};

export const RevealPasswordInput = ({ isPasswordShown: initialValue = false, render }: Props) => {
  const [isPasswordShown, setIsPasswordShown] = useState(initialValue);

  return (
    <div className="flex border border-input ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      {render({
        className: "border-0 ring-0 focus-visible:ring-0 focus-visible:ring-offset-0",
        type: isPasswordShown ? "text" : "password",
      })}
      <Button
        aria-label={isPasswordShown ? "パスワードを隠す" : "パスワードを表示"}
        onClick={() => setIsPasswordShown((prev) => !prev)}
        size="icon"
        type="button"
        variant="ghost"
      >
        {isPasswordShown ? <FaEye /> : <FaEyeSlash />}
      </Button>
    </div>
  );
};
