import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useId } from "react";
import { IoChatboxEllipses } from "react-icons/io5";

import { DropdownHamburgerMenu } from "../DropdownHamburgerMenu";

import { Button } from "@/components/shadcn/ui/button";
import { NavLinkButton } from "@/components/ui/domain/NavLinkButton";
import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";

export const PostLoginHeader = () => {
  const linkId = useId();
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <div className="m-2 bg-background/80">
      <header
        aria-label="ヘッダー"
        className="flex w-full items-center justify-center space-x-3 rounded border-2 border-primary p-2 pr-8"
      >
        <div className="mr-auto flex items-center justify-center">
          <Button
            asChild
            aria-current={pathname === "/dashboard" ? "page" : undefined}
            aria-labelledby={linkId}
            className="flex items-center justify-center space-x-1 font-sans text-lg font-black"
            variant="ghost"
          >
            <Link href="/dashboard">
              <Image alt="コップルアイコン" height={28} src="/kopple.png" width={28} />
              <span id={linkId}>Kopple</span>
            </Link>
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
