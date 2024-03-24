import Link from "next/link";

import { PreLoginHeader } from "@/components/layouts/domain/PreLoginHeader";
import { Button } from "@/components/shadcn/ui/button";

export default function TopPage() {
  return (
    <div className="w-screen">
      <div className="fixed -inset-x-2/4 inset-y-0 z-[-1] animate-[slide_3s_ease-in-out_infinite_alternate] bg-[linear-gradient(-60deg,#6c3_50%,#09f_50%)] opacity-50" />
      <div className="fixed -inset-x-2/4 inset-y-0 z-[-1] animate-[slide_4s_ease-in-out_infinite_alternate-reverse] bg-[linear-gradient(-60deg,#6c3_50%,#09f_50%)] opacity-50" />
      <div className="fixed -inset-x-2/4 inset-y-0 z-[-1] animate-[slide_5s_ease-in-out_infinite_alternate] bg-[linear-gradient(-60deg,#6c3_50%,#09f_50%)] opacity-50" />
      <div className="fixed left-2/4 top-2/4 box-border h-full w-full -translate-x-2/4 -translate-y-2/4 rounded-[0.25em] p-[10vmin] text-center shadow-[0_0_0.25em_rgba(0,0,0,0.25)]">
        <PreLoginHeader />
        <div className="mt-12 space-y-4 bg-background/80 px-12 py-8">
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="text-4xl font-bold text-foreground">コップル</div>
            <div className="text-3xl font-bold text-foreground">
              高専生向けコミュニケーションアプリ
            </div>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4">
            <Button
              asChild
              className="w-48 rounded-[48px] border-8 border-emerald-200 bg-pink-600 px-24 py-8 hover:bg-pink-600/80"
            >
              <Link href="/sign-up">アカウントを作成する</Link>
            </Button>
            <Button asChild className="w-48 rounded-lg bg-sky-400 px-16 py-4 hover:bg-sky-400/80">
              <Link href="/sign-in">ログイン</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
