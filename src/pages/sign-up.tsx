import Link from "next/link";

import { Navbar } from "@/components/layouts/base/Navbar";
import { Button } from "@/components/ui/button";
import { SignUpForm } from "@/features/sign-up/components/layouts/SignUpForm";

export default function SignUpPage() {
  return (
    <div>
      <Navbar />
      <div>Sign up</div>
      <SignUpForm />
      <Button asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
