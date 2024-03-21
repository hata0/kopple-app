import { SignInForm } from "../SignInForm";

import { PreLoginHeader } from "@/components/layouts/domain/PreLoginHeader";
import { useSignIn } from "@/features/sign-in/hooks/useSignIn";

export const SignIn = () => {
  const { onSubmit } = useSignIn();

  return (
    <div>
      <PreLoginHeader />
      <SignInForm onSubmit={onSubmit} />
    </div>
  );
};
