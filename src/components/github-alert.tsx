import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const alertStyles = {
  caution: {
    border: "border-l-red-500",
    title: "Caution",
  },
  important: {
    border: "border-l-purple-500",
    title: "Important",
  },
  note: {
    border: "border-l-blue-500",
    title: "Note",
  },
  tip: {
    border: "border-l-green-500",
    title: "Tip",
  },
  warning: {
    border: "border-l-yellow-500",
    title: "Warning",
  },
} as const;

type GitHubAlertType = keyof typeof alertStyles;

interface GitHubAlertProps {
  children: ReactNode;
  className?: string;
  title?: string;
  type?: GitHubAlertType;
}

export function GitHubAlert({
  children,
  className,
  title,
  type = "note",
}: GitHubAlertProps) {
  const alert = alertStyles[type];

  return (
    <aside
      className={cn(
        "my-4 rounded-md border-l-4 border-solid bg-accent px-4 py-3 text-foreground",
        alert.border,
        className
      )}
    >
      <p className="mb-1.5 font-bold">{title ?? alert.title}</p>
      <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </aside>
  );
}
