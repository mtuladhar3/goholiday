import Link from "next/link";
import Magnetic from "@/components/animations/Magnetic";
import { ArrowUpRight } from "./Icons";

type Variant = "ink" | "saffron" | "paper" | "ghost";

const variants: Record<Variant, { button: string; icon: string }> = {
  ink: { button: "bg-ink text-paper hover:bg-navy", icon: "bg-paper text-ink group-hover:bg-gold" },
  saffron: { button: "bg-navy text-white hover:bg-saffron", icon: "bg-white text-navy group-hover:bg-gold" },
  paper: { button: "bg-paper text-ink hover:bg-navy hover:text-white", icon: "bg-ink text-paper group-hover:bg-gold group-hover:text-navy" },
  ghost: { button: "border border-current/25 text-current hover:border-gold", icon: "bg-navy text-white group-hover:bg-saffron" },
};

type ButtonProps = {
  href: string;
  children: string;
  variant?: Variant;
  className?: string;
};

/** Pill button with a rolling label, rotating arrow and magnetic pull. */
export default function Button({ href, children, variant = "ink", className = "" }: ButtonProps) {
  const v = variants[variant];
  return (
    <Magnetic className={className}>
      <Link href={href} className={`group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-medium transition-colors duration-500 ${v.button}`}>
        <span className="relative overflow-hidden">
          <span className="block transition-transform duration-500 ease-expo group-hover:-translate-y-full">{children}</span>
          <span className="absolute inset-0 translate-y-full transition-transform duration-500 ease-expo group-hover:translate-y-0" aria-hidden>
            {children}
          </span>
        </span>
        <span className={`grid size-9 place-items-center rounded-full transition-[rotate,background-color,color] duration-500 ease-expo group-hover:rotate-45 ${v.icon}`}>
          <ArrowUpRight className="size-4" />
        </span>
      </Link>
    </Magnetic>
  );
}
