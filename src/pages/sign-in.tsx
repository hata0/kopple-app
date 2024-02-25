import Link from "next/link";

import { Navbar } from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";

export default function SignInPage() {
  return (
    <div>
      <Navbar />
      <div>Sign in</div>
      <Button asChild>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
