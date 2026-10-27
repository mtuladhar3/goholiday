import Image from "next/image";
import Link from "next/link";
import { site } from "@/data/site";
import logo from "../../../public/logo.png";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`block ${className}`} aria-label={`${site.name} home`}>
      <Image src={logo} alt={site.name} loading="eager" quality={100} sizes="120px" className="h-20 w-auto sm:h-24" />
    </Link>
  );
}
