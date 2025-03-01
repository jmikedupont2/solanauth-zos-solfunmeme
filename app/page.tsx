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
              Solfunmeme
            </span>  
               <img src="icons/solfunmeme-logo.png" alt="Solfunmeme" />       
          </h1>
          <p className="text-center text-lg font-medium leading-relaxed text-muted-foreground md:text-xl">
            Zero Ontology System - Solfunmeme - Solana wallet authentication and dashboard
          </p>
        </div>
        <ActionButtons />
      </main>

    </>
  );
}
