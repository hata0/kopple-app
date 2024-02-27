import { Navbar } from "@/components/layouts/base/Navbar";
import { SignUpForm } from "@/features/sign-up/components/layouts/SignUpForm";

export default function SignUpPage() {
  return (
    <div>
      <Navbar />
      <SignUpForm />
    </div>
  );
}
