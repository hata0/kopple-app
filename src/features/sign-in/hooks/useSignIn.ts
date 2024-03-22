import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { setCookie } from "nookies";

import { Props } from "../components/SignInForm";
import { getSession } from "../services/api/session";

import { toast } from "@/components/shadcn/ui/use-toast";
import { firebaseClient } from "@/lib/firebase/client";

type onSubmitType = Props["onSubmit"];

export const useSignIn = () => {
  const router = useRouter();

  const onSubmit: onSubmitType = async (values, setErrorMessage) => {
    const { email, password } = values;

    try {
      const credential = await signInWithEmailAndPassword(firebaseClient, email, password);
      const idToken = await credential.user.getIdToken();
      const { error, res } = await getSession(idToken);

      setCookie(null, "uid", credential.user.uid, {
        // 5日
        maxAge: 60 * 60 * 24 * 5,
        path: "/",
        sameSite: "lax",
        secure: true,
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
      setErrorMessage("認証に失敗しました。もう一度入力してください。");
    }
  };

  return { onSubmit };
};
