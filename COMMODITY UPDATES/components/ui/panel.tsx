import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-3xl border border-edge bg-panel/90 p-5 shadow-terminal backdrop-blur-sm", className)}>
      {children}
    </div>
  );
}
