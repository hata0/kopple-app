import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "../../ui/button";

import { NavLinkButton } from "@/components/ui/domain/NavLinkButton";
import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";

export const PreLoginHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;

  return (
    <header aria-label="ヘッダー" className="flex">
      <Button asChild variant="ghost">
        <Link href="/">My App</Link>
      </Button>
      <nav aria-label="ナビゲーション">
        <NavLinkButton href="/dashboard" pathname={pathname}>
          ダッシュボード
        </NavLinkButton>
        <NavLinkButton href="/sign-in" pathname={pathname}>
          ログイン
        </NavLinkButton>
        <NavLinkButton href="/sign-up" pathname={pathname}>
          新規登録
        </NavLinkButton>
      </nav>
      <ThemeModeToggle />
    </header>
  );
};
