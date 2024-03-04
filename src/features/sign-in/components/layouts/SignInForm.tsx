import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Account } from "../../types/SignIn";

import { Button } from "@/components/ui/button";
import { RevealPasswordInput } from "@/components/ui/case/RevealPasswordInput";
import { ErrorMessage } from "@/components/ui/domain/ErrorMessage";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { FormLegend } from "@/components/ui/domain/FormLegend";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

const formSchema = z.object({
  email: z.string().email("メールアドレスの形式が不正です。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export const SignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const headingId = useId();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    const { error, res } = await fetcher<Account>(`${BACKEND_URL}/sign-in`, {
      body: {
        email,
        password,
      },
      method: "POST",
    });

    if (error || !res?.ok) {
      setErrorMessage("認証に失敗しました。もう一度入力してください。");
    } else {
      toast({
        title: "ログインに成功しました",
      });

      await router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form
        aria-labelledby={headingId}
        className="space-y-8"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      >
        <FormHeading id={headingId}>ログイン</FormHeading>
        <fieldset>
          <FormLegend>アカウント情報の入力</FormLegend>
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
        </fieldset>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <div className="flex space-x-8">
          <Button type="submit">ログイン</Button>
          <div>
            <span>または</span>
            <Button asChild className="px-2" variant="link">
              <Link href="/sign-up">新規登録</Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
