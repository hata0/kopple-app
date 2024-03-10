import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
      <Component {...pageProps} />
      <Toaster />
    </ThemeProvider>
  );
}
