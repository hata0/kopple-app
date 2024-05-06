import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { VscSend } from "react-icons/vsc";

import { Button } from "@/components/shadcn/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { TextareaAutosize } from "@/components/ui/case/TextareaAutosize";
import { ChatInput, chatInputSchema } from "@/services/backend/messages/create/[id]";

type Props = {
  onSubmit: (values: ChatInput) => Promise<void>;
};
export const ChatForm = ({ onSubmit }: Props) => {
  const form = useForm<ChatInput>({
    defaultValues: {
      message: "",
    },
    mode: "onChange",
    resolver: zodResolver(chatInputSchema),
  });
  const [isFocus, setIsFocus] = useState(false);

  const handleSubmit = async (values: ChatInput) => {
    form.reset();
    await onSubmit(values);
  };
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      await form.handleSubmit(handleSubmit)(e);
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full items-center justify-center bg-accent px-20 py-4"
        onSubmit={(e) => void form.handleSubmit(handleSubmit)(e)}
      >
        <div className="relative h-fit w-full">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="h-fit w-full space-y-0">
                <FormControl>
                  <TextareaAutosize
                    {...field}
                    aria-label="メッセージを入力"
                    className="resize-none pr-14 transition-[height] delay-150 duration-300 ease-in-out"
                    maxRows={6}
                    minRows={isFocus ? 3 : 1}
                    onBlur={() => setIsFocus(false)}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onFocus={() => setIsFocus(true)}
                    onKeyDown={(e) => void handleKeyDown(e)}
                    placeholder="メッセージを入力"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            aria-label="送信"
            className="absolute bottom-[10px] right-5 h-7 w-7 p-1"
            disabled={!form.formState.isValid}
            type="submit"
          >
            <VscSend />
          </Button>
        </div>
      </form>
    </Form>
  );
};
