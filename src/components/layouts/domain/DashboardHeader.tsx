import Link from "next/link";

import { Button } from "@/components/ui/button";

export const DashboardHeader = () => {
  return (
    <header aria-label="ヘッダー">
      <Button asChild variant="ghost">
        <Link href="/dashboard">My App</Link>
      </Button>
    </header>
  );
};
