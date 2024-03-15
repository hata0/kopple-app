import type { AppProps } from "next/app";
import Head from "next/head";
import { ThemeProvider } from "next-themes";

import { Toaster } from "@/components/shadcn/ui/toaster";
import "@/styles/globals.css";
import { AuthProvider } from "@/providers/AuthProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <title>Kopple</title>
      </Head>
      <ThemeProvider disableTransitionOnChange enableSystem attribute="class" defaultTheme="system">
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
