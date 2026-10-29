import { paymentSchedule } from "@/data/payments";
import Reveal from "@/components/animations/Reveal";

const tones = ["bg-saffron text-ink", "bg-navy text-white"];
const dots = ["bg-saffron", "bg-navy", "border border-ink/20 bg-paper-deep"];

/** One bar split by share of the trip price, with the matching steps underneath. */
export default function PaymentSchedule() {
  const paid = paymentSchedule.filter((s) => s.share > 0);
  return (
    <div>
      <Reveal from={{ scaleX: 0, transformOrigin: "left center" }} className="flex h-20 gap-1.5 overflow-hidden rounded-full sm:h-24">
        {paid.map((s, i) => (
          <div key={s.title} style={{ flex: `${s.share} 1 0%` }} className={`flex min-w-0 items-center rounded-full px-4 sm:px-6 ${tones[i]}`}>
            <span className="type-headline">{s.share}%</span>
          </div>
        ))}
      </Reveal>

      <Reveal className="mt-6 grid gap-4 md:grid-cols-3" stagger={0.08}>
        {paymentSchedule.map((s, i) => (
          <div key={s.title} className="rounded-card border border-ink/10 bg-paper p-6">
            <p className="flex items-center gap-3 text-sm text-stone">
              <span className={`size-3 rounded-full ${dots[i]}`} />
              Step {i + 1} · {s.when}
            </p>
            <h3 className="type-title mt-8">
              {s.title}
              {s.share > 0 && <span className="text-stone"> · {s.share}%</span>}
            </h3>
            <p className="mt-3 leading-relaxed text-stone">{s.text}</p>
          </div>
        ))}
      </Reveal>
    </div>
  );
}
