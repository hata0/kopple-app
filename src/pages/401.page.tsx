import Link from "next/link";

import { Button } from "@/components/shadcn/ui/button";

export default function Custom401() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="font-medium">認証に失敗しました。ログインまたは新規登録してください。</div>
      <div className="flex space-x-4">
        <Button asChild>
          <Link href="/sign-in">ログイン</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">新規登録</Link>
        </Button>
        <Button asChild>
          <Link href="/">トップページへ</Link>
        </Button>
      </div>
    </div>
  );
}
