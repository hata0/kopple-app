import Link from "next/link";

import { Navbar } from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";
import { SignInForm } from "@/features/sign-in/components/layouts/SignInForm";

export default function SignInPage() {
  return (
    <div>
      <Navbar />
      <div>Sign in</div>
      <SignInForm />
      <Button asChild>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
