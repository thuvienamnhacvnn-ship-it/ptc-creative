import { cn } from "@/lib/utils";

/**
 * Standard 16:9 stage for home modules.
 * Keeps visual rhythm: banner, story, team, services… same canvas.
 */
export function HomeFrame({
  id,
  children,
  className,
  frameClassName,
  edge = true,
  code,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
  frameClassName?: string;
  /** Show thin accent top edge */
  edge?: boolean;
  code?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-[4.5rem] border-b border-border/80 bg-background/40 py-3 sm:py-4 lg:py-5",
        className
      )}
    >
      <div className="mx-auto w-full max-w-7xl px-3 sm:px-5 lg:px-8">
        <div
          className={cn(
            "home-frame relative w-full overflow-hidden border border-border bg-[#060b14]",
            "aspect-[16/9] min-h-[260px] max-h-[min(78vh,860px)]",
            frameClassName
          )}
        >
          {edge && (
            <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-gradient-to-r from-transparent via-accent/55 to-transparent" />
          )}
          {code && (
            <span className="pointer-events-none absolute left-3 top-3 z-20 font-mono text-[9px] tracking-[0.18em] text-white/35 uppercase">
              {code}
            </span>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
