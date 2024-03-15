import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/shadcn/ui/use-toast";
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
      const user = credential.user;
      const idToken = await user.getIdToken();

      const getSessionCookieRes = await fetcher(`${API_ROUTE_URL}/session`, {
        headers: {
          Authorization: idToken ? `Bearer ${idToken}` : "",
        },
      });

      if (getSessionCookieRes.error || !getSessionCookieRes.res?.ok) {
        setErrorMessage("認証に失敗しました。もう一度入力してください。");
        return;
      }

      // TODO: バッグエンドできたらユーザー作成クエリを投げる
      // const createUserRes = await fetcherWithAuth(`${BACKEND_URL}/user`, undefined, {
      //   body: {
      //     email: user.email,
      //     id: user.uid,
      //   },
      //   method: "POST",
      // });

      // if (createUserRes.error || !createUserRes.res?.ok) {
      //   setErrorMessage("認証に失敗しました。もう一度入力してください。");
      //   return;
      // }

      // 5日
      const expiresIn = 60 * 60 * 24 * 5 * 1000;

      const options: Omit<ResponseCookie, "name" | "value"> = {
        maxAge: expiresIn,
        path: "/",
        sameSite: "lax",
        secure: true,
      };

      setCookie(null, "uid", user.uid, options);

      toast({
        title: "ログインに成功しました",
      });
      await router.push("/dashboard");
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
