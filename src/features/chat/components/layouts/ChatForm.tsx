import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { VscSend } from "react-icons/vsc";
import useSWR from "swr";
import { z } from "zod";

import { ChatContents, Message } from "../../types/ChatContents";
import { CreateMessageRequest } from "../../types/CreateMessage";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

const formSchema = z.object({
  message: z.string().min(1),
});

export const ChatForm = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const { data: chatContents, mutate } = useSWR<ChatContents>(`/user/chat/${id}`);
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { message } = values;

    await mutate(
      async () => {
        const { error, res } = await fetcher<CreateMessageRequest>(
          `${BACKEND_URL}/messages/create/${id}`,
          {
            body: {
              message,
            },
            method: "POST",
          },
        );

        if (error) {
          toast({
            title: "メッセージの送信に失敗しました。",
            variant: "destructive",
          });
          throw new Error();
        } else {
          const additionalMessage = (await res?.json()) as Message;
          console.log({
            ...chatContents!,
            messages: [...chatContents!.messages, additionalMessage],
          });
          return {
            ...chatContents!,
            messages: [additionalMessage, ...chatContents!.messages],
          };
        }
      },
      {
        optimisticData: {
          ...chatContents!,
          messages: [
            {
              createdAt: new Date(),
              id: crypto.randomUUID(),
              isMyMessage: true,
              message,
            },
            ...chatContents!.messages,
          ],
        },
        rollbackOnError: true,
      },
    );
  };

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
