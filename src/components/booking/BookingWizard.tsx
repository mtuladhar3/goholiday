"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";
import {
  BALANCE_DAYS_BEFORE,
  DEPOSIT_SHARE,
  LEAD_TIME_DAYS,
  MAX_TRAVELLERS,
  SINGLE_SUPPLEMENT,
  bookingSteps,
  extras,
  paymentChoices,
  type ExtraId,
  type PaymentChoice,
} from "@/data/booking";
import { site } from "@/data/site";
import { addDays } from "@/lib/calendar";
import { longDate, usd } from "@/lib/format";
import { lenisRef } from "@/lib/lenis";
import { fieldClass, labelClass, pillClass } from "@/components/ui/form";
import { ArrowLeft, ArrowUpRight, Check, Minus, Plus } from "@/components/ui/Icons";
import BookingSummary, { type Quote } from "./BookingSummary";
import DateCalendar from "./DateCalendar";
import type { BookableTour } from "./types";

/** Card-style radio/checkbox: the input is visually hidden and the whole card restyles when checked. */
const choiceCard =
  "relative flex cursor-pointer flex-col rounded-card border border-ink/15 bg-white p-4 transition-colors hover:border-navy has-[:checked]:border-navy has-[:checked]:bg-navy/[0.04] has-[:checked]:ring-1 has-[:checked]:ring-navy has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-saffron";

const tick = (
  <span className="absolute right-4 top-4 grid size-5 place-items-center rounded-full border border-ink/20 text-transparent transition-colors peer-checked:border-navy peer-checked:bg-navy peer-checked:text-white">
    <Check className="size-3" strokeWidth={3} />
  </span>
);

/** Placeholder reservation reference — replace with the one your booking backend returns. */
const makeReference = (slug: string) => `GH-${slug.slice(0, 3).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

/** Earliest start date we accept: today (UTC) plus the permit lead time. */
const earliestStart = () => addDays(new Date().toISOString().slice(0, 10), LEAD_TIME_DAYS);

/** Space kept above the panel for the fixed navbar when scrolling it into view. */
const NAV_CLEARANCE = 112;

const isIsoDate = (s: string | null): s is string => Boolean(s && /^\d{4}-\d{2}-\d{2}$/.test(s));

function StepHeading({ n, title, text, className = "mb-6" }: { n: number; title: ReactNode; text: string; className?: string }) {
  return (
    <div className={className}>
      <p className="type-eyebrow text-saffron">
        Step {n} of {bookingSteps.length}
      </p>
      <h2 className="type-title mt-2">{title}</h2>
      <p className="mt-1.5 text-sm text-stone">{text}</p>
    </div>
  );
}

/**
 * Four-step reservation form sized to the viewport: the step path, the fields and the Back/Continue bar
 * are always on screen together, and only the fields scroll if a step runs long.
 * Prefills from ?tour=&date=&travellers= links.
 */
export default function BookingWizard({ tours }: { tours: BookableTour[] }) {
  const params = useSearchParams();
  const root = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);

  // Reading search params keeps this component browser-only (under Suspense), so "today" is stable.
  const [minDate] = useState(earliestStart);
  const today = addDays(minDate, -LEAD_TIME_DAYS);
  const initialTour = tours.find((t) => t.slug === params.get("tour")) ?? tours[0];
  const requested = params.get("date");

  const [step, setStep] = useState(0);
  const [reference, setReference] = useState<string | null>(null);
  const [dateMissing, setDateMissing] = useState(false);

  const [tourSlug, setTourSlug] = useState(initialTour.slug);
  const [date, setDate] = useState<string | null>(isIsoDate(requested) && requested >= minDate ? requested : null);
  const [travellers, setTravellersState] = useState(() => Math.min(MAX_TRAVELLERS, Math.max(1, Number(params.get("travellers")) || 2)));
  const [room, setRoom] = useState<"twin" | "single">("twin");
  const [lead, setLead] = useState({ first: "", last: "", email: "", phone: "", country: "" });
  const [guests, setGuests] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [chosen, setChosen] = useState<ExtraId[]>(["arrival"]);
  const [payment, setPayment] = useState<PaymentChoice>("card");

  const tour = tours.find((t) => t.slug === tourSlug)!;
  const setTravellers = (n: number) => setTravellersState(Math.min(MAX_TRAVELLERS, Math.max(1, n)));
  const chooseDate = (iso: string) => {
    setDate(iso);
    setDateMissing(false);
  };

  const single = room === "single" ? SINGLE_SUPPLEMENT * travellers : 0;
  const extraRows = extras.filter((e) => chosen.includes(e.id)).map((e) => ({ title: e.title, amount: e.price * travellers }));
  const total = tour.price * travellers + single + extraRows.reduce((sum, e) => sum + e.amount, 0);
  const quote: Quote = {
    perPerson: tour.price,
    single,
    extras: extraRows,
    total,
    deposit: Math.round(total * DEPOSIT_SHARE),
    balanceDue: !date ? null : addDays(date, -BALANCE_DAYS_BEFORE) <= today ? "now" : addDays(date, -BALANCE_DAYS_BEFORE),
  };

  // Brings the whole panel (path, fields and buttons) into view below the navbar.
  const align = () => {
    const el = root.current;
    if (!el) return;
    if (lenisRef.current) lenisRef.current.scrollTo(el, { offset: -NAV_CLEARANCE });
    else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_CLEARANCE, behavior: "smooth" });
  };

  const goTo = (n: number) => {
    setStep(n);
    body.current?.scrollTo({ top: 0 });
    align();
  };

  // "Continue" is a real submit, so the browser validates the visible fields first; the calendar is checked here.
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 0 && !date) return setDateMissing(true);
    if (step < bookingSteps.length - 1) return goTo(step + 1);
    setReference(makeReference(tour.slug));
    align();
  };

  const panel = "flex flex-col overflow-hidden rounded-panel border border-ink/10";
  // Fills the screen under the fixed navbar, leaving a small gap at the bottom.
  const fit = "h-[calc(100svh-7rem)] min-h-[560px] sm:h-[calc(100svh-9rem)]";

  if (reference) {
    const next = [
      { title: "Confirmation email", text: `Reservation ${reference} and your invoice are on their way to ${lead.email}.` },
      { title: `Pay the ${DEPOSIT_SHARE * 100}% deposit`, text: `${usd(quote.deposit)} by ${paymentChoices.find((p) => p.id === payment)!.title.toLowerCase()} — the link or details are in the email.` },
      { title: "Passport scans", text: "We'll ask for clear copies so we can apply for your permits." },
      { title: "Balance & final briefing", text: `${usd(quote.total - quote.deposit)} ${quote.balanceDue === "now" ? "due with the deposit, as you're travelling soon" : `due ${longDate(quote.balanceDue!)}`}, then your pre-departure call.` },
    ];
    return (
      <div ref={root} className={`${panel} ${fit} bg-ink text-paper`} role="status">
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 lg:p-14" data-lenis-prevent>
          <div className="mx-auto max-w-3xl">
            <span className="grid size-14 place-items-center rounded-full bg-saffron text-2xl text-ink">✓</span>
            <p className="type-eyebrow mt-6 text-paper/60">Reservation {reference}</p>
            <h2 className="type-headline mt-2">
              Your place is <em>held.</em>
            </h2>
            <p className="mt-4 max-w-lg text-paper/70">
              {lead.first ? `Thank you, ${lead.first}. ` : ""}We&apos;re holding {travellers} {travellers === 1 ? "place" : "places"} on {tour.title}
              {date ? `, starting ${longDate(date)}` : ""}. Here&apos;s what happens next.
            </p>
            <ol className="mt-8 grid border-t border-paper/15 sm:grid-cols-2 sm:gap-x-8">
              {next.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2.5rem_1fr] gap-3 border-b border-paper/15 py-4">
                  <span className="type-eyebrow pt-1 text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-medium tracking-tight">{s.title}</span>
                    <span className="mt-1 block text-sm text-paper/60">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/" className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-gold">
                Back to home
              </Link>
              <a href={`mailto:${site.email}?subject=Reservation%20${reference}`} className="rounded-full border border-paper/20 px-6 py-3 text-sm font-medium transition-colors hover:border-gold hover:text-gold">
                Questions? Email us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const categories = [...new Set(tours.map((t) => t.category))];
  const isLast = step === bookingSteps.length - 1;

  return (
    <div ref={root} className="grid gap-4 lg:grid-cols-[1fr_380px]">
      <form onSubmit={onSubmit} className={`${panel} ${fit} bg-paper`}>
        {/* Path: title and the four steps, always visible */}
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-ink/10 px-5 py-4 sm:px-8">
          <h2 className="text-xl font-medium tracking-tight">
            Your <em>reservation</em>
          </h2>
          <ol className="hidden items-center gap-1.5 md:flex">
            {bookingSteps.map((label, i) => {
              const done = i < step;
              const current = i === step;
              return (
                <li key={label} className="flex items-center gap-1.5">
                  <button
                    type="button"
                    disabled={!done}
                    onClick={() => goTo(i)}
                    aria-current={current ? "step" : undefined}
                    className={`flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs font-medium transition-colors ${
                      current ? "border-navy bg-navy text-white" : done ? "border-ink/15 bg-white hover:border-navy hover:text-navy" : "border-ink/10 text-stone"
                    }`}
                  >
                    <span className={`grid size-6 place-items-center rounded-full ${current ? "bg-white text-navy" : done ? "bg-navy text-white" : "bg-paper-deep"}`}>
                      {done ? <Check className="size-3" strokeWidth={3} /> : i + 1}
                    </span>
                    {label}
                  </button>
                  {i < bookingSteps.length - 1 && <span className={`h-px w-4 ${done ? "bg-navy" : "bg-ink/15"}`} aria-hidden />}
                </li>
              );
            })}
          </ol>
          {/* Compact path on small screens */}
          <div className="w-full md:hidden">
            <p className="flex justify-between text-xs font-medium">
              <span>{bookingSteps[step]}</span>
              <span className="text-stone">
                {step + 1} / {bookingSteps.length}
              </span>
            </p>
            <div className="mt-2 grid grid-cols-4 gap-1" aria-hidden>
              {bookingSteps.map((s, i) => (
                <span key={s} className={`h-1 rounded-full ${i <= step ? "bg-navy" : "bg-ink/10"}`} />
              ))}
            </div>
          </div>
        </header>

        {/* Fields — the only part that scrolls */}
        <div ref={body} className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8" data-lenis-prevent>
          {step === 0 && (
            <>
              <div className="grid gap-6 xl:grid-cols-[1fr_minmax(0,340px)]">
                <div className="grid content-start gap-5">
                  <StepHeading n={1} className="mb-1" title={<>Choose your <em>dates</em></>} text={`Pick any start date at least ${LEAD_TIME_DAYS} days ahead — Tibet permits take about three weeks.`} />
                  <div>
                    <label htmlFor="bk-tour" className={labelClass}>Trip</label>
                    <select id="bk-tour" value={tourSlug} onChange={(e) => setTourSlug(e.target.value)} className={fieldClass}>
                      {categories.map((c) => (
                        <optgroup key={c} label={c}>
                          {tours.filter((t) => t.category === c).map((t) => (
                            <option key={t.slug} value={t.slug}>
                              {t.title} · {t.days} days · from {usd(t.price)}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>
                  <div>
                    <p className={labelClass}>Travellers</p>
                    <div className="flex items-center justify-between rounded-thumb border border-ink/15 bg-white px-4 py-2">
                      <span className="font-medium" aria-live="polite">
                        {travellers} {travellers === 1 ? "adult" : "adults"}
                      </span>
                      <span className="flex gap-2">
                        <button type="button" onClick={() => setTravellers(travellers - 1)} disabled={travellers <= 1} aria-label="Remove a traveller" className="grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-navy hover:text-navy disabled:opacity-30">
                          <Minus className="size-4" />
                        </button>
                        <button type="button" onClick={() => setTravellers(travellers + 1)} disabled={travellers >= MAX_TRAVELLERS} aria-label="Add a traveller" className="grid size-9 place-items-center rounded-full border border-ink/15 transition-colors hover:border-navy hover:text-navy disabled:opacity-30">
                          <Plus className="size-4" />
                        </button>
                      </span>
                    </div>
                  </div>
                  <fieldset>
                    <legend className={labelClass}>Rooms</legend>
                    <div className="flex flex-wrap gap-2">
                      <label className={pillClass}>
                        <input type="radio" name="room" checked={room === "twin"} onChange={() => setRoom("twin")} className="sr-only" />
                        Twin share
                      </label>
                      <label className={pillClass}>
                        <input type="radio" name="room" checked={room === "single"} onChange={() => setRoom("single")} className="sr-only" />
                        Own room +{usd(SINGLE_SUPPLEMENT)}
                      </label>
                    </div>
                  </fieldset>
                </div>
                <div>
                  <p className={labelClass}>Start date</p>
                  <DateCalendar value={date} onChange={chooseDate} min={minDate} days={tour.days} invalid={dateMissing} />
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <StepHeading n={2} title={<>Who&apos;s <em>travelling?</em></>} text="Names exactly as they appear on passports — we use them for your permits." />
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {(
                  [
                    ["first", "First name", "given-name", "text"],
                    ["last", "Last name", "family-name", "text"],
                    ["country", "Nationality", "country-name", "text"],
                    ["email", "Email", "email", "email"],
                    ["phone", "Phone / WhatsApp", "tel", "tel"],
                  ] as const
                ).map(([key, text, auto, type]) => (
                  <div key={key}>
                    <label htmlFor={`bk-${key}`} className={labelClass}>{text}</label>
                    <input id={`bk-${key}`} type={type} required autoComplete={auto} value={lead[key]} onChange={(e) => setLead({ ...lead, [key]: e.target.value })} className={fieldClass} />
                  </div>
                ))}
              </div>

              {travellers > 1 && (
                <fieldset className="mt-6 border-t border-ink/10 pt-6">
                  <legend className={labelClass}>Travelling with you · optional, send later if unsure</legend>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                    {Array.from({ length: travellers - 1 }, (_, i) => (
                      <div key={i}>
                        <label htmlFor={`bk-guest-${i}`} className="sr-only">Traveller {i + 2} full name</label>
                        <input
                          id={`bk-guest-${i}`}
                          value={guests[i] ?? ""}
                          onChange={(e) => setGuests(Object.assign([...guests], { [i]: e.target.value }))}
                          placeholder={`Traveller ${i + 2} — full name`}
                          className={fieldClass}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
              )}

              <div className="mt-6">
                <label htmlFor="bk-notes" className={labelClass}>Health, diet or anything we should know</label>
                <textarea id="bk-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Vegetarian, asthma, first time at altitude, celebrating a birthday…" className={`${fieldClass} resize-none`} />
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <StepHeading n={3} title={<>Add a few <em>extras</em></>} text="Optional — add or change these any time before departure." />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {extras.map((x) => (
                  <label key={x.id} className={choiceCard}>
                    <input
                      type="checkbox"
                      checked={chosen.includes(x.id)}
                      onChange={(e) => setChosen(e.target.checked ? [...chosen, x.id] : chosen.filter((c) => c !== x.id))}
                      className="peer sr-only"
                    />
                    {tick}
                    <span className="pr-8 font-medium">{x.title}</span>
                    <span className="mt-1 flex-1 text-sm text-stone">{x.text}</span>
                    <span className="mt-3 font-medium tabular-nums">
                      {x.price ? usd(x.price) : "Free"} <span className="text-sm font-normal text-stone">{x.per}</span>
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <StepHeading n={4} title={<>Check &amp; <em>reserve</em></>} text="Nothing is charged now — we confirm availability first, then send your deposit link." />
              <dl className="grid gap-px overflow-hidden rounded-card border border-ink/10 bg-ink/10 sm:grid-cols-2">
                {[
                  { label: "Trip", value: `${tour.title} · ${date ? longDate(date) : "date to choose"}`, step: 0 },
                  { label: "Travellers", value: `${travellers} · ${room === "single" ? "own rooms" : "twin share"}`, step: 0 },
                  { label: "Lead traveller", value: `${lead.first} ${lead.last} · ${lead.email}`, step: 1 },
                  { label: "Extras", value: extraRows.map((e) => e.title).join(", ") || "None", step: 2 },
                ].map((r) => (
                  <div key={r.label} className="flex items-start justify-between gap-4 bg-white p-4">
                    <div className="min-w-0">
                      <dt className="type-eyebrow text-stone">{r.label}</dt>
                      <dd className="mt-1 text-sm font-medium">{r.value}</dd>
                    </div>
                    <button type="button" onClick={() => goTo(r.step)} className="shrink-0 text-sm text-navy underline underline-offset-4 hover:text-saffron">
                      Edit<span className="sr-only"> {r.label.toLowerCase()}</span>
                    </button>
                  </div>
                ))}
              </dl>

              <fieldset className="mt-6">
                <legend className={labelClass}>How you&apos;ll pay the deposit</legend>
                <div className="grid gap-3 sm:grid-cols-3">
                  {paymentChoices.map((p) => (
                    <label key={p.id} className={choiceCard}>
                      <input type="radio" name="payment" checked={payment === p.id} onChange={() => setPayment(p.id)} className="peer sr-only" />
                      {tick}
                      <span className="pr-8 font-medium">{p.title}</span>
                      <span className="mt-1 text-sm text-stone">{p.text}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm">
                <input type="checkbox" required className="mt-0.5 size-4 shrink-0 accent-navy" />
                <span className="text-stone">
                  I&apos;ve read and accept the{" "}
                  <Link href="/terms-and-conditions" target="_blank" className="text-navy underline underline-offset-4 hover:text-saffron">terms &amp; conditions</Link>, and understand travel insurance with helicopter evacuation is required.
                </span>
              </label>

              <div className="mt-6 lg:hidden">
                <BookingSummary tour={tour} date={date} travellers={travellers} quote={quote} />
              </div>
            </>
          )}
        </div>

        {/* Actions — pinned to the bottom of the panel */}
        <footer className="flex items-center justify-between gap-3 border-t border-ink/10 bg-white/70 px-5 py-3 sm:px-8 sm:py-4">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-3 text-sm font-medium transition-colors hover:border-navy hover:text-navy">
              <ArrowLeft className="size-4" /> Back
            </button>
          ) : (
            // On small screens the summary panel is hidden, so the running total sits here instead.
            <span className="text-sm leading-tight text-stone lg:invisible">
              <span className="block font-medium text-ink">{usd(quote.total)}</span>
              {usd(quote.deposit)} deposit
            </span>
          )}
          <button
            type="submit"
            className="group flex items-center gap-4 rounded-full bg-navy py-1.5 pl-5 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-saffron sm:gap-6 sm:pl-6"
          >
            {isLast ? (
              <span>
                Reserve<span className="hidden sm:inline"> · {usd(quote.deposit)} deposit</span>
              </span>
            ) : (
              <span>
                Continue<span className="hidden sm:inline"> to {bookingSteps[step + 1].toLowerCase()}</span>
              </span>
            )}
            <span className="grid size-10 place-items-center rounded-full bg-white text-navy transition-[rotate,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold">
              <ArrowUpRight className="size-4" />
            </span>
          </button>
        </footer>
      </form>

      <aside className={`hidden lg:block ${fit} overflow-y-auto rounded-panel`} data-lenis-prevent>
        <BookingSummary tour={tour} date={date} travellers={travellers} quote={quote} />
      </aside>
    </div>
  );
}
