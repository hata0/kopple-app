import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "@/components/ui/use-toast";
import { firebaseClient } from "@/lib/firebase/client";

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
      await signInWithEmailAndPassword(firebaseClient, email, password);
      toast({
        title: "ログインに成功しました",
      });
      await router.push("/dashboard");
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
