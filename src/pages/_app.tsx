import type { AppProps } from "next/app";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
