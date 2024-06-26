import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { Button } from "@/components/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/ui/dropdown-menu";
import { toast } from "@/components/shadcn/ui/use-toast";
import { deleteSession } from "@/services/api/session";

export const DropdownHamburgerMenu = memo(() => {
  const router = useRouter();

  const handleLogoutSelect = async () => {
    const { error, res } = await deleteSession();

    if (error || !res?.ok) {
      toast({
        title: "ログアウトに失敗しました。",
        variant: "destructive",
      });
    } else {
      toast({
        title: "ログアウトしました。",
      });
      await router.push("/");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button aria-label="メニューを表示" size="icon" variant="outline">
          <GiHamburgerMenu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>設定</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">プロフィールを編集</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => void handleLogoutSelect()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>ログアウト</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});

DropdownHamburgerMenu.displayName = "DropdownHamburgerMenu";
