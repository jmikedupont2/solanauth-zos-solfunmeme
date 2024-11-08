import { ConnectIcon } from "@/components/icons/ConnectIcon";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/ui/button";
import { useAnimation } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ActionButtons = () => {
  const controls = useAnimation();
  return (
    <section className="flex items-center justify-center gap-4">
      <ThemeToggle />
      <Button
        className="h-fit gap-2 rounded-full bg-primary font-semibold text-background"
        onMouseEnter={() => controls.start("animate")}
        onMouseLeave={() => controls.start("normal")}
      >
        Connect Wallet
        <ConnectIcon controls={controls} />
      </Button>
      <Link target="_blank" href="https://github.com/aymanch-03/solanauth">
        <Button
          variant={"expandIcon"}
          Icon={ArrowRight}
          iconPlacement="right"
          className="h-fit rounded-full bg-secondary font-semibold text-foreground hover:bg-secondary/70"
        >
          Github
        </Button>
      </Link>
    </section>
  );
};
