import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useId, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Account } from "../../types/SignUp";

import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/domain/ErrorMessage";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { FormLegend } from "@/components/ui/domain/FormLegend";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { fetcher } from "@/utils/fetcher";

const formSchema = z
  .object({
    email: z.string().email("メールアドレスの形式が不正です。"),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください。")
      .regex(
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
        "パスワードは半角英数字混合で入力してください。",
      ),
    passwordConfirm: z.string().min(1, "確認用のパスワードを入力してください。"),
  })
  .superRefine(({ password, passwordConfirm }, ctx) => {
    if (password !== passwordConfirm) {
      ctx.addIssue({
        code: "custom",
        message: "パスワードが一致しません",
        path: ["passwordConfirm"],
      });
    }
  });

export const SignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const headingId = useId();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;

    const { error } = await fetcher<Account>("https://my.backend/sign-up", {
      body: {
        email,
        password,
      },
      method: "POST",
    });

    if (error) {
      setErrorMessage("新規登録に失敗しました。もう一度入力してください。");
    } else {
      toast({
        title: "新規登録に成功しました。",
      });

      await router.push("/");
    }
  };

  return (
    <Form {...form}>
      <form
        aria-labelledby={headingId}
        className="space-y-8"
        onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
      >
        <FormHeading id={headingId}>新規登録</FormHeading>
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
                <FormControl>
                  <Input type="password" {...field} autoComplete="new-password" />
                </FormControl>
                <FormDescription>
                  半角英数字混合で8文字以上のパスワードを作成してください。
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>確認用パスワード</FormLabel>
                <FormControl>
                  <Input type="password" {...field} autoComplete="new-password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <ErrorMessage>{errorMessage}</ErrorMessage>
        <div className="flex space-x-4">
          <Button type="submit">新規登録</Button>
          <div>
            <span>または</span>
            <Button asChild className="px-2" variant="link">
              <Link href="/sign-in">ログイン</Link>
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};
