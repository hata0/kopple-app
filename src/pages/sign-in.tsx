import { RootHeader } from "@/components/layouts/base/RootHeader";
import { SignInForm } from "@/features/sign-in/components/layouts/SignInForm";

export default function SignInPage() {
  return (
    <div>
      <RootHeader />
      <SignInForm />
    </div>
  );
}
