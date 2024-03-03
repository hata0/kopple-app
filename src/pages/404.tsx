import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Custom404() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-8">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl font-bold">404</h1>
        <h2 className="text-4xl font-medium">ページが見つかりませんでした。</h2>
      </div>
      <Button asChild>
        <Link href="/">ホームページへ</Link>
      </Button>
    </div>
  );
}
