import Link from "next/link";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover shadow-sm shadow-accent/15",
  secondary:
    "bg-elevated text-foreground border border-border hover:border-foreground/20",
  outline:
    "border border-border bg-transparent text-foreground hover:border-accent hover:text-accent",
  ghost: "bg-transparent text-foreground hover:bg-elevated",
  dark: "bg-foreground text-background hover:opacity-90",
  signal:
    "bg-transparent text-accent border border-accent/40 hover:bg-accent-muted",
} as const;

const sizes = {
  sm: "h-9 px-3.5 text-sm rounded-md",
  md: "h-11 px-5 text-sm rounded-md",
  lg: "h-12 px-6 text-base rounded-md",
  icon: "h-10 w-10 rounded-md",
} as const;

type ButtonProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  id?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  disabled,
  onClick,
  id,
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2 font-medium tracking-tight transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick} id={id}>
      {children}
    </button>
  );
}
