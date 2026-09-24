import type { ComponentPropsWithoutRef } from "react";

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "className"> & {
  variant?: "primary" | "secondary" | "text";
  external?: boolean;
};

const variantClasses = {
  primary:
    "bg-violet-500 text-white hover:bg-violet-400 focus-visible:outline-violet-300",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-violet-400/60 hover:bg-violet-500/10 focus-visible:outline-violet-300",
  text: "text-violet-200 hover:text-white focus-visible:outline-violet-300",
} as const;

export function ButtonLink({
  children,
  variant = "primary",
  external = false,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${variantClasses[variant]}`}
      rel={external ? "noopener noreferrer" : props.rel}
      target={external ? "_blank" : props.target}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
