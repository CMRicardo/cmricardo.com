import { LaptopIcon, Moon02Icon, SunIcon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { ButtonGroup } from "./ui/button-group";

const themes = ["theme-light", "system", "dark"] as const;

export function ModeToggle() {
  const [theme, setThemeState] = useState<(typeof themes)[number]>("system");

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setThemeState(isDarkMode ? "dark" : "theme-light");
  }, []);

  useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList[isDark ? "add" : "remove"]("dark");
  }, [theme]);

  useEffect(function themeKeyboardShortcut() {
    const onKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;

      if (
        e.key.toLowerCase() === "t" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        target?.tagName !== "INPUT" &&
        target?.tagName !== "TEXTAREA" &&
        target?.tagName !== "SELECT" &&
        !target?.isContentEditable
      ) {
        setThemeState((currentTheme) => {
          const currentIndex = themes.indexOf(currentTheme);
          return themes[(currentIndex + 1) % themes.length];
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <ButtonGroup>
      <Button
        className={cn(
          theme === "theme-light" && "bg-primary text-primary-foreground"
        )}
        onClick={() => setThemeState("theme-light")}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <span className="sr-only">Light theme</span>
        <Icon icon={SunIcon} />
      </Button>
      <Button
        className={cn(
          theme === "system" && "bg-primary text-primary-foreground"
        )}
        onClick={() => setThemeState("system")}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <span className="sr-only">System theme</span>
        <Icon icon={LaptopIcon} />
      </Button>
      <Button
        className={cn(theme === "dark" && "bg-primary text-primary-foreground")}
        onClick={() => setThemeState("dark")}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <span className="sr-only">Dark theme</span>
        <Icon icon={Moon02Icon} />
      </Button>
    </ButtonGroup>
  );
}
