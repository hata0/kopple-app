import Link from "next/link";
import { Dispatch, memo, SetStateAction, useId } from "react";

import { useSignInForm } from "../../hooks/useSignInForm";

import { Button } from "@/components/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn/ui/form";
import { Input } from "@/components/shadcn/ui/input";
import { RevealPasswordInput } from "@/components/ui/case/RevealPasswordInput";
import { ErrorMessage } from "@/components/ui/domain/ErrorMessage";
import { FormHeading } from "@/components/ui/domain/FormHeading";
import { FormLegend } from "@/components/ui/domain/FormLegend";
import { SignInInput } from "@/services/api/session/type";

export type Props = {
  onSubmit: (
    values: SignInInput,
    setErrorMessage: Dispatch<SetStateAction<string>>,
  ) => Promise<void>;
};

export const SignInForm = memo(({ onSubmit }: Props) => {
  const headingId = useId();
  const { errorMessage, form, setErrorMessage } = useSignInForm();

  return (
    <Form {...form}>
      <form
        noValidate
        aria-labelledby={headingId}
        className="space-y-8 px-16 py-4"
        onSubmit={(e) => void form.handleSubmit((val) => onSubmit(val, setErrorMessage))(e)}
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
});

SignInForm.displayName = "SignInForm";
