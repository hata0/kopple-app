import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
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

    try {
      const credential = await signInWithEmailAndPassword(firebaseClient, email, password);
      const idToken = await credential.user.getIdToken();
      const { error, res } = await fetcher(`${API_ROUTE_URL}/session`, {
        headers: {
          Authorization: idToken ? `Bearer ${idToken}` : "",
        },
      });

      // 5日
      const expiresIn = 60 * 60 * 24 * 5 * 1000;

      const options: Omit<ResponseCookie, "name" | "value"> = {
        maxAge: expiresIn,
        path: "/",
        sameSite: "lax",
        secure: true,
      };

      setCookie(null, "uid", credential.user.uid, options);

      if (error || !res?.ok) {
        setErrorMessage("認証に失敗しました。もう一度入力してください。");
      } else {
        toast({
          title: "ログインに成功しました",
        });
        await router.push("/dashboard");
      }
    } catch (e) {
      setErrorMessage("認証に失敗しました。もう一度入力してください。");
    }
  };

  return {
    errorMessage,
    form,
    onSubmit,
  };
};
