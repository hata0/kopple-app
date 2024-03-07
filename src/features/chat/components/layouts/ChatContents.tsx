import { InterlocutorChatContent } from "./InterlocutorChatContent";
import { OneselfChatContent } from "./OneselfChatContent";

export const ChatContents = () => {
  return (
    <div className="space-y-3 p-3">
      {Array.from({ length: 5 }).map((_, index) => {
        return index % 2 === 0 ? (
          <InterlocutorChatContent key={index} />
        ) : (
          <OneselfChatContent key={index} />
        );
      })}
    </div>
  );
};
