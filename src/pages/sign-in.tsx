import { PreLoginHeader } from "@/components/layouts/domain/PreLoginHeader";
import { SignInForm } from "@/features/sign-in/components/layouts/SignInForm";

export default function SignInPage() {
  return (
    <div>
      <PreLoginHeader />
      <SignInForm />
    </div>
  );
}
