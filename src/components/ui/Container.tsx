import type { ReactNode } from "react";

export default function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1600px] px-4 sm:px-8 ${className}`}>{children}</div>;
}
