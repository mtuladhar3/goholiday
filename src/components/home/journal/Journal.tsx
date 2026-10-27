import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/data/blogs";
import Section from "@/components/ui/Section";
import SectionHeader from "@/components/ui/SectionHeader";
import Reveal from "@/components/animations/Reveal";

export default function Journal() {
  const [featured, ...rest] = blogs;

  return (
    <Section id="journal">
      <SectionHeader
        label="Blogs & updates"
        title={"From the\n*journal*"}
        description="Field notes, planning guides and stories from the trail, written by our guides."
        action={{ href: "#journal", label: "All stories" }}
      />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <Reveal>
          <Link href={featured.href} data-cursor="Read" className="group block">
            <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
              <Image src={featured.image} alt={featured.title} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-[scale] duration-1000 ease-expo group-hover:scale-105" />
              <span className="glass absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-medium text-white">{featured.category}</span>
            </div>
            <p className="mt-6 text-sm text-stone">
              {featured.date} — {featured.readTime}
            </p>
            <h3 className="type-title mt-2 max-w-2xl">
              <span className="bg-linear-to-r from-ink to-ink bg-[length:0%_2px] bg-left-bottom bg-no-repeat transition-[background-size] duration-700 ease-expo group-hover:bg-[length:100%_2px]">
                {featured.title}
              </span>
            </h3>
            <p className="mt-3 max-w-xl text-stone">{featured.excerpt}</p>
          </Link>
        </Reveal>

        <Reveal className="flex flex-col justify-between" stagger={0.1}>
          {rest.map((post) => (
            <Link key={post.title} href={post.href} className="group grid grid-cols-[1fr_auto] items-center gap-6 border-t border-mist py-6 last:border-b lg:flex-1">
              <span>
                <span className="type-eyebrow text-stone">
                  {post.category} · {post.readTime}
                </span>
                <span className="mt-3 block text-xl font-medium leading-tight tracking-tight transition-colors group-hover:text-navy sm:text-2xl">
                  {post.title}
                </span>
                <span className="mt-2 block text-sm text-stone">{post.excerpt}</span>
                <span className="mt-3 block text-xs text-stone">{post.date}</span>
              </span>
              <span className="relative size-24 overflow-hidden rounded-thumb sm:size-36">
                <Image src={post.image} alt="" fill sizes="144px" className="object-cover transition-[scale] duration-700 ease-expo group-hover:scale-110" />
              </span>
            </Link>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
