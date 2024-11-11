"use client";
import { ActionButtons } from "@/components/ActionButtons";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";

export default function Home() {
  return (
    <>
      <main className="flex flex-col items-center gap-10">
        <div className="flex max-w-lg flex-col items-center gap-4">
          <h1 className="w-fit text-4xl font-semibold md:text-5xl">
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Solan
            </span>
            <span className="bg-gradient-to-r from-[#14F195] to-foreground bg-clip-text text-transparent">
              A
            </span>
            uth
          </h1>
          <p className="text-center text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            Responsive Solana wallet authentication and account modal with{" "}
            <AnimatedTooltip
              label="NextAuth"
              className="font-semibold text-foreground transition-colors duration-300 ease-out"
              icon={"/icons/nextauth-logo.png"}
              href="https://next-auth.js.org/"
              rotate={-3}
            />{" "}
            integration and{" "}
            <AnimatedTooltip
              label="shadcn/ui"
              className="font-semibold text-foreground transition-colors duration-300 ease-out"
              icon={"/icons/shadcn-logo.png"}
              href="https://ui.shadcn.com/"
              rotate={3}
            />
          </p>
        </div>
        <ActionButtons />
      </main>
      <footer className="absolute bottom-3.5 mx-auto flex items-center gap-[0.5ch] text-center text-muted-foreground">
        <span>Crafted by</span>
        <AnimatedTooltip
          label="Ayman Echakar"
          className="font-semibold text-foreground transition-colors duration-300 ease-out"
          icon={"/icons/ayman-favicon.svg"}
          href="https://github.com/aymanch-03"
        />
      </footer>
    </>
  );
}
