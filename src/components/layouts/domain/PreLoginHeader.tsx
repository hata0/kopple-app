import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { Button } from "../../ui/button";

import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";

type LinkButtonProps = {
  href: string;
  children: ReactNode;
};

export const PreLoginHeader = () => {
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
    <header aria-label="ヘッダー" className="flex">
      <Button asChild variant="ghost">
        <Link href="/">My App</Link>
      </Button>
      <nav aria-label="ナビゲーション">
        <LinkButton href="/dashboard">ダッシュボード</LinkButton>
        <LinkButton href="/sign-in">ログイン</LinkButton>
        <LinkButton href="/sign-up">新規登録</LinkButton>
      </nav>
      <ThemeModeToggle />
    </header>
  );
};
