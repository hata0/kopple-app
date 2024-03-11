import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { API_ROUTE_URL } from "@/constants/apiRouteUrl";
import { firebaseClient } from "@/lib/firebase/client";
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

export const useSignUpForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
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

    try {
      const credential = await createUserWithEmailAndPassword(firebaseClient, email, password);
      const idToken = await credential.user.getIdToken();

      const { error, res } = await fetcher(`${API_ROUTE_URL}/session`, {
        headers: {
          Authorization: idToken ? `Bearer ${idToken}` : "",
        },
      });

      if (error || !res?.ok) {
        setErrorMessage("認証に失敗しました。もう一度入力してください。");
      } else {
        toast({
          title: "ログインに成功しました",
        });
        await router.push("/dashboard");
      }
    } catch (e) {
      setErrorMessage("新規登録に失敗しました。もう一度入力してください。");
    }
  };

  return {
    errorMessage,
    form,
    onSubmit,
  };
};
