import Link from "next/link";
import { useRouter } from "next/router";
import { IoChatboxEllipses } from "react-icons/io5";

import { DropdownHamburgerMenu } from "./DropdownHamburgerMenu";

import { Button } from "@/components/ui/button";
import { NavLinkButton } from "@/components/ui/domain/NavLinkButton";
import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";

export const PostLoginHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <header aria-label="ヘッダー" className="flex">
      <Button asChild variant="ghost">
        <Link href="/dashboard">My App</Link>
      </Button>
      <NavLinkButton href="/talk" pathname={pathname}>
        <IoChatboxEllipses />
        <span>トークリスト</span>
      </NavLinkButton>
      <ThemeModeToggle />
      <DropdownHamburgerMenu />
    </header>
  );
};
