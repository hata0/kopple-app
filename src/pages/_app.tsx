import type { AppProps } from "next/app";

import { Toaster } from "@/components/ui/toaster";

import "@/styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}
