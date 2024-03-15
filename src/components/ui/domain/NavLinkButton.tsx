import Link from "next/link";
import { ReactNode } from "react";

import { Button } from "../../shadcn/ui/button";

type Props = {
  href: string;
  children: ReactNode;
  pathname: string;
};

export const NavLinkButton = ({ children, href, pathname }: Props) => {
  return (
    <Button asChild className={pathname === href ? "" : "text-muted-foreground"} variant="ghost">
      <Link href={href}>{children}</Link>
    </Button>
  );
};
