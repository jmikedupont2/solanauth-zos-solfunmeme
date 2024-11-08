"use client";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex cursor-pointer select-none items-center transition border",
        className,
      )}
    >
      <div
        className={`size-6 rounded ${theme === "light" ? "bg-black" : "bg-white"}`}
      />
    </div>
  );
};
