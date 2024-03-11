import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
