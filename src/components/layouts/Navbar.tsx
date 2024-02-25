import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Button } from "../ui/button";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
};

export const Navbar = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const LinkButton = ({ children, href }: LinkButtonProps) => {
    return (
      <Button asChild className={pathname === href ? "" : "text-muted-foreground"} variant="ghost">
        <Link href={href}>{children}</Link>
      </Button>
    );
  };

  return (
    <nav>
      <Button asChild variant="ghost">
        <Link href="/">My App</Link>
      </Button>
      <LinkButton href="/sign-in">Sign in</LinkButton>
      <LinkButton href="/sign-up">Sign up</LinkButton>
    </nav>
  );
};
