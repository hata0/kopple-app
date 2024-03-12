import Link from "next/link";
import { useId } from "react";

import { useSignUpForm } from "../../hooks/useSignUpForm";

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

export const SignUpForm = () => {
  const { errorMessage, form, onSubmit } = useSignUpForm();
  const headingId = useId();

  return (
    <Form {...form}>
      <form
        aria-labelledby={headingId}
        className="space-y-8 px-16 py-4"
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
