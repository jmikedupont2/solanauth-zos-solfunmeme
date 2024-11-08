import { ThemeProvider } from "@/components/theme/theme-provider";
import ContextProvider from "@/providers/ContextProvider";
import type { Metadata } from "next";
import localFont from "next/font/local";
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
  title: "SolanAuth",
  description:
    "Responsive Solana wallet authentication and account modal with NextAuth integration and shadcn/ui",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${satoshi.variable} relative font-main antialiased`}>
        <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:25px_25px] opacity-30 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        <ContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div
              vaul-drawer-wrapper
              className="container mx-auto flex h-[100dvh] items-center justify-center px-2"
            >
              {children}
            </div>
          </ThemeProvider>
        </ContextProvider>
      </body>
    </html>
  );
}
