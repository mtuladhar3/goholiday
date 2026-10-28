// Styles for the raw HTML copy: intro paragraph, h3 sections, check-mark bullets and numbered lists.
const richText = [
  "leading-[1.7] text-stone [&>*+*]:mt-4",
  "[&>p:first-child]:text-lg [&>p:first-child]:text-ink",
  "[&_h3]:mt-9 [&_h3]:flex [&_h3]:items-center [&_h3]:gap-3 [&_h3]:border-t [&_h3]:border-mist [&_h3]:pt-8 [&_h3]:text-xl [&_h3]:font-medium [&_h3]:leading-snug [&_h3]:tracking-tight [&_h3]:text-ink",
  "[&_h3]:before:h-5 [&_h3]:before:w-1.5 [&_h3]:before:shrink-0 [&_h3]:before:rounded-full [&_h3]:before:bg-saffron",
  "[&_h3:first-child]:mt-0 [&_h3:first-child]:border-0 [&_h3:first-child]:pt-0 [&_h3+*]:mt-3",
  "[&_ul]:grid [&_ul]:gap-2.5 [&_ol]:grid [&_ol]:gap-2.5 [&_li]:relative [&_li]:pl-7",
  "[&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.3em] [&_ul>li]:before:grid [&_ul>li]:before:size-[1.125rem] [&_ul>li]:before:place-items-center [&_ul>li]:before:rounded-full [&_ul>li]:before:bg-navy [&_ul>li]:before:text-[10px] [&_ul>li]:before:font-bold [&_ul>li]:before:text-white [&_ul>li]:before:content-['✓']",
  "[&_ol]:[counter-reset:item] [&_ol>li]:[counter-increment:item]",
  "[&_ol>li]:before:absolute [&_ol>li]:before:left-0 [&_ol>li]:before:top-[0.3em] [&_ol>li]:before:grid [&_ol>li]:before:size-[1.125rem] [&_ol>li]:before:place-items-center [&_ol>li]:before:rounded-full [&_ol>li]:before:bg-navy [&_ol>li]:before:text-[11px] [&_ol>li]:before:font-medium [&_ol>li]:before:text-white [&_ol>li]:before:content-[counter(item)]",
  "[&_strong]:font-medium [&_strong]:text-ink",
  "[&_a]:text-navy [&_a]:underline [&_a]:underline-offset-4 [&_a:hover]:text-saffron",
].join(" ");

/** Styled block of HTML copy (p, h3, ul/ol, a, strong). The HTML comes from our own data files, never from users. */
export default function RichText({ html }: { html: string }) {
  return <div className={richText} dangerouslySetInnerHTML={{ __html: html }} />;
}
