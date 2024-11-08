import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Button } from "@/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConnectionModal } from "./ConnectionModal";

export const ActionButtons = () => {
  return (
    <section className="flex items-center justify-center gap-4">
      <ThemeToggle />
      <ConnectionModal />
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
