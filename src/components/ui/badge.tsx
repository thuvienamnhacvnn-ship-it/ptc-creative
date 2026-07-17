import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border border-border bg-accent-muted px-2.5 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-accent uppercase",
        className
      )}
    >
      {children}
    </span>
  );
}
