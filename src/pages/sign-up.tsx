import Link from "next/link";

import { Navbar } from "@/components/layouts/Navbar";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
  return (
    <div>
      <Navbar />
      <div>Sign up</div>
      <Button asChild>
        <Link href="/sign-in">Sign in</Link>
      </Button>
    </div>
  );
}
