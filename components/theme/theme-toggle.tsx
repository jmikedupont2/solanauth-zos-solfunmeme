"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      onClick={toggleTheme}
      size={"icon"}
      variant={"ghost"}
      className={cn("rounded-xl", className)}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  );
};
