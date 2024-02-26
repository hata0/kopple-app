import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { RevealPasswordInput } from "@/components/ui/case/RevealPasswordInput";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { fetcher } from "@/utils/fetcher";

const formSchema = z.object({
  email: z.string().email("メールアドレスの形式が不正です。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export const SignInForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    const data = await fetcher("https://my.backend/sign-in", {
      body: {
        email,
        password,
      },
      method: "POST",
    });

    console.log(data);
  };

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>メールアドレス</FormLabel>
              <FormControl>
                <Input type="email" {...field} autoComplete="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>パスワード</FormLabel>
              <RevealPasswordInput
                render={(inputProps) => (
                  <FormControl>
                    <Input {...inputProps} {...field} autoComplete="current-password" />
                  </FormControl>
                )}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
