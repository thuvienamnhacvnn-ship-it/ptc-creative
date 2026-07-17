import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { AnimatedSection } from "./animated-section";

export function PageHero({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border">
      <div className="pointer-events-none absolute inset-0 bg-tech-grid opacity-50" />
      <div className="pointer-events-none absolute inset-0 bg-glow" />
      <Container className="relative py-14 sm:py-18 lg:py-20">
        <AnimatedSection className="max-w-3xl">
          {badge && <Badge className="mb-5">{badge}</Badge>}
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
              {subtitle}
            </p>
          )}
        </AnimatedSection>
      </Container>
    </div>
  );
}
