import { LaptopIcon, Moon02Icon, SunIcon } from "@hugeicons/core-free-icons";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  applyTheme,
  getThemePreference,
  saveThemePreference,
} from "@/lib/theme";
import { cn } from "@/lib/utils";
import { Icon } from "./icon";
import { ButtonGroup } from "./ui/button-group";

const themes = ["light", "system", "dark"] as const;

export function ModeToggle() {
  const [theme, setThemeState] = useState<(typeof themes)[number]>("system");

  useEffect(() => {
    setThemeState(getThemePreference());
    const scheme = window.matchMedia("(prefers-color-scheme: dark)");
    const sync = () => {
      const preference = getThemePreference();
      setThemeState(preference);
      applyTheme(preference);
    };
    scheme.addEventListener("change", sync);
    window.addEventListener("storage", sync);
    return () => {
      scheme.removeEventListener("change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function setTheme(preference: (typeof themes)[number]) {
    saveThemePreference(preference);
    setThemeState(preference);
  }

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
        const currentIndex = themes.indexOf(getThemePreference());
        const next = themes[(currentIndex + 1) % themes.length];
        saveThemePreference(next);
        setThemeState(next);
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
          theme === "light" && "bg-primary text-primary-foreground"
        )}
        onClick={() => setTheme("light")}
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
        onClick={() => setTheme("system")}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <span className="sr-only">Same as system</span>
        <Icon icon={LaptopIcon} />
      </Button>
      <Button
        className={cn(theme === "dark" && "bg-primary text-primary-foreground")}
        onClick={() => setTheme("dark")}
        size={"icon-sm"}
        variant={"ghost"}
      >
        <span className="sr-only">Dark theme</span>
        <Icon icon={Moon02Icon} />
      </Button>
    </ButtonGroup>
  );
}
