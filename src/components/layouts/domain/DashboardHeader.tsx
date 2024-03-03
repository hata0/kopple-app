import Link from "next/link";

import { DropdownHamburgerMenu } from "./DropdownHamburgerMenu";

import { Button } from "@/components/ui/button";
import { ThemeModeToggle } from "@/components/ui/domain/ThemeModeToggle";

export const DashboardHeader = () => {
  return (
    <header aria-label="ヘッダー" className="flex">
      <Button asChild variant="ghost">
        <Link href="/dashboard">My App</Link>
      </Button>
      <ThemeModeToggle />
      <DropdownHamburgerMenu />
    </header>
  );
};
