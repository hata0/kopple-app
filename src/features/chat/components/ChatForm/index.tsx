import { useState } from "react";
import { VscSend } from "react-icons/vsc";

import { useChatForm } from "../../hooks/useChatForm";

import { Button } from "@/components/shadcn/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { TextareaAutosize } from "@/components/ui/case/TextareaAutosize";

export const ChatForm = () => {
  const { form, handleKeyDown, onSubmit } = useChatForm();
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Form {...form}>
      <form
        className="flex w-full items-center justify-center bg-accent px-20 py-4"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
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
