export type ThemePreference = "system" | "light" | "dark";

export function getThemePreference(): ThemePreference {
  try {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      return saved;
    }
  } catch {
    // Storage can be unavailable; the theme still works for this page.
  }
  return "system";
}

export function applyTheme(preference: ThemePreference) {
  const dark =
    preference === "dark" ||
    (preference === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.classList.toggle("dark", dark);
}

export function saveThemePreference(preference: ThemePreference) {
  try {
    localStorage.setItem("theme", preference);
  } catch {
    // Storage can be unavailable; the theme still works for this page.
  }
  applyTheme(preference);
}
