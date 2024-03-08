import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Account } from "../types/SignIn";

import { toast } from "@/components/ui/use-toast";
import { BACKEND_URL } from "@/constants/backendUrl";
import { fetcher } from "@/utils/fetcher";

const formSchema = z.object({
  email: z.string().email("メールアドレスの形式が不正です。"),
  password: z.string().min(1, "パスワードを入力してください。"),
});

export const useSignInForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
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

  return {
    errorMessage,
    form,
    onSubmit,
  };
};
