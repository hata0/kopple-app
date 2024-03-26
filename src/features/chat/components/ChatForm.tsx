import { VscSend } from "react-icons/vsc";

import { useChatForm } from "../hooks/useChatForm";

import { Button } from "@/components/shadcn/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/shadcn/ui/form";
import { Textarea } from "@/components/shadcn/ui/textarea";
import { cn } from "@/lib/utils";

export const ChatForm = () => {
  const { form, handleKeyDown, messageHeightRef, onSubmit, rows } = useChatForm();

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
                <textarea
                  ref={messageHeightRef}
                  aria-hidden
                  readOnly
                  className="absolute h-0 w-full overflow-scroll pl-3 pr-14 text-sm"
                  rows={1}
                  value={field.value}
                />
                <FormControl>
                  <Textarea
                    {...field}
                    className={cn("min-h-[auto] resize-none overflow-y-scroll pr-14", {
                      "h-[38px]": rows === 1,
                      "h-[52px]": rows === 2,
                      "transition-[height] delay-150 duration-300 ease-in-out focus:h-[78px]":
                        rows <= 3,
                    })}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                    onKeyDown={(e) => void handleKeyDown(e)}
                    placeholder="メッセージを入力"
                    rows={rows >= 7 ? 6 : rows === 0 ? 1 : rows}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            className="absolute bottom-1 right-5 h-7 w-7 p-1"
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
