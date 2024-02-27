import { Navbar } from "@/components/layouts/base/Navbar";
import { SignInForm } from "@/features/sign-in/components/layouts/SignInForm";

export default function SignInPage() {
  return (
    <div>
      <Navbar />
      <SignInForm />
    </div>
  );
}
