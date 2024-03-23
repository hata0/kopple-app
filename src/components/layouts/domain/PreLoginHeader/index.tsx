import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo, useId } from "react";

import { Button } from "../../../shadcn/ui/button";

import { NavLinkButton } from "@/components/ui/domain/NavLinkButton";
import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";
import { useIsHasSession } from "@/hooks/useIsHasSession";

export const PreLoginHeader = memo(() => {
  const linkId = useId();
  const router = useRouter();
  const pathname = router.pathname;
  const { isHasSession } = useIsHasSession();

  return (
    <div className="m-2 bg-background/80">
      <header
        aria-label="ヘッダー"
        className="flex w-full items-center justify-center space-x-3 rounded border-2 border-primary p-2 pr-8"
      >
        <div className="mr-auto flex">
          <Button
            asChild
            aria-current={pathname === "/" ? "page" : undefined}
            aria-labelledby={linkId}
            className="flex items-center justify-center space-x-1 font-sans text-lg font-black"
            variant="ghost"
          >
            <Link href="/">
              <Image alt="コップルアイコン" height={28} src="/kopple.png" width={28} />
              <span id={linkId}>Kopple</span>
            </Link>
          </Button>
          <nav aria-label="ナビゲーション">
            {isHasSession ? (
              <Button asChild className="text-muted-foreground" variant="ghost">
                <Link href="/dashboard">ダッシュボード</Link>
              </Button>
            ) : (
              <>
                <NavLinkButton href="/sign-in" pathname={pathname}>
                  ログイン
                </NavLinkButton>
                <NavLinkButton href="/sign-up" pathname={pathname}>
                  新規登録
                </NavLinkButton>
              </>
            )}
          </nav>
        </div>
        <div className="ml-auto">
          <ThemeModeToggle />
        </div>
      </header>
    </div>
  );
});

PreLoginHeader.displayName = "PreLoginHeader";
