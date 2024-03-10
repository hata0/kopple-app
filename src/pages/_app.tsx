import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </SessionProvider>
  );
}
