import { VscSend } from "react-icons/vsc";

import { useChatForm } from "../../hooks/useChatForm";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export const ChatForm = () => {
  const { form, onSubmit } = useChatForm();

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="メッセージを入力" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button size="icon" type="submit">
          <VscSend />
        </Button>
      </form>
    </Form>
  );
};
