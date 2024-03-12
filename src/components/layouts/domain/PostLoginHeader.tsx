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
    <div className="m-2 bg-background/80">
      <header
        aria-label="ヘッダー"
        className="flex w-full items-center justify-center space-x-3 rounded border-2 border-primary p-2 pr-8"
      >
        <div className="mr-auto flex items-center justify-center">
          <Button asChild className="font-sans text-lg font-black" variant="ghost">
            <Link href="/dashboard">Kopple</Link>
          </Button>
          <NavLinkButton href="/chats" pathname={pathname}>
            <IoChatboxEllipses />
            <span>チャットリスト</span>
          </NavLinkButton>
        </div>
        <ThemeModeToggle />
        <DropdownHamburgerMenu />
      </header>
    </div>
  );
};
