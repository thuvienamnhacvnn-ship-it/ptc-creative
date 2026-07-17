import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  className,
  children,
  id,
  contained = true,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
  /** Wrap children in max-width container (default true) */
  contained?: boolean;
}) {
  return (
    <section id={id} className={cn("py-16 sm:py-20 lg:py-24", className)}>
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}
