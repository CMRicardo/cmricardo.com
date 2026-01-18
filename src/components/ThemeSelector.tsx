import * as React from "react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "./ui/button-group"
import { Icon } from "./Icon"
import { LaptopIcon, MoonIcon, SunIcon } from "@hugeicons/core-free-icons"
import { cn } from "@/lib/utils"

export function ModeToggle() {
  const [theme, setThemeState] = React.useState<
    "theme-light" | "dark" | "system"
  >("system")

  React.useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setThemeState(isDarkMode ? "dark" : "theme-light")
  }, [])

  React.useEffect(() => {
    const isDark =
      theme === "dark" ||
      (theme === "system" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  return (
    <ButtonGroup>
      <Button className={cn(theme === 'theme-light' && 'bg-primary text-primary-foreground')} size={'icon-sm'} variant={'ghost'} onClick={() => setThemeState('theme-light')} >
        <span className="sr-only" >Light theme</span>
        <Icon icon={SunIcon} />
      </Button>
      <Button className={cn(theme === 'system' && 'bg-primary text-primary-foreground')} size={'icon-sm'} variant={'ghost'} onClick={() => setThemeState('system')} >
        <span className="sr-only" >System theme</span>
        <Icon icon={LaptopIcon} />
      </Button>
      <Button className={cn(theme === 'dark' && 'bg-primary text-primary-foreground')} size={'icon-sm'} variant={'ghost'} onClick={() => setThemeState('dark')} >
        <span className="sr-only" >Dark theme</span>
        <Icon icon={MoonIcon} />
      </Button>
    </ButtonGroup>
  )
}