import ContextProvider from "@/providers/ContextProvider";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";

const satoshi = localFont({
  src: [
    { path: "./fonts/Satoshi-Black.ttf", weight: "800" },
    { path: "./fonts/Satoshi-Bold.ttf", weight: "700" },
    { path: "./fonts/Satoshi-Medium.ttf", weight: "500" },
    { path: "./fonts/Satoshi-Regular.ttf", weight: "400" },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  title: "zos solfunmeme SolanAuth",
  description:
    "Solfunmeme Solana wallet authentication",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${satoshi.variable} font-main antialiased`}>
        <div vaul-drawer-wrapper="true" className="relative bg-background">
          <ContextProvider>
            <ThemeProvider
              disableTransitionOnChange
              attribute="class"
              defaultTheme="dark"
            >
              <div className="fixed inset-0 z-0 bg-background">
                <div className="h-full w-full bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:25px_25px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
              </div>
              <div className="relative z-10">
                <div className="container mx-auto flex h-[100dvh] items-center justify-center px-2">
                  {children}
                </div>
              </div>
            </ThemeProvider>
          </ContextProvider>
        </div>
        
      </body>
    </html>
  );
}
