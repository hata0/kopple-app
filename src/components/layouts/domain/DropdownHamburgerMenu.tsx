import { LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { API_ROUTE_URL } from "@/constants/apiRouteUrl";
import { fetcher } from "@/utils/fetcher";

export const DropdownHamburgerMenu = memo(() => {
  const router = useRouter();

  const handleLogoutSelect = async () => {
    const { error, res } = await fetcher(`${API_ROUTE_URL}/session`, {
      method: "DELETE",
    });

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
