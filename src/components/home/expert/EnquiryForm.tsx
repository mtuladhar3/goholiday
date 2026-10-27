"use client";

import { useState, type FormEvent } from "react";
import { destinations } from "@/data/destinations";
import { ArrowUpRight } from "@/components/ui/Icons";

const field =
  "w-full rounded-thumb border border-paper/15 bg-paper/5 px-4 py-3 text-sm text-paper outline-none transition-colors placeholder:text-paper/35 focus:border-saffron";
const label = "type-eyebrow mb-2 block text-paper/50";

const months = ["Flexible", "Mar – May (spring)", "Jun – Aug (monsoon)", "Sep – Nov (autumn)", "Dec – Feb (winter)"];

/** Trip enquiry. Wire `onSubmit` to your email/CRM endpoint; for now it confirms locally. */
export default function EnquiryForm() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex min-h-[420px] flex-col items-start justify-center gap-4 rounded-card border border-paper/15 p-8" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-saffron text-2xl text-ink">✓</span>
        <p className="type-title">
          Namaste — we&apos;ve got your <em>request.</em>
        </p>
        <p className="max-w-sm text-paper/60">A local expert will reply within 24 hours with ideas, dates and a first itinerary.</p>
        <button type="button" onClick={() => setSent(false)} className="text-sm underline underline-offset-4 hover:text-gold">
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-card border border-paper/15 p-5 sm:grid-cols-2 sm:p-6">
      <div>
        <label htmlFor="enq-name" className={label}>
          Name
        </label>
        <input id="enq-name" name="name" required autoComplete="name" placeholder="Your name" className={field} />
      </div>
      <div>
        <label htmlFor="enq-email" className={label}>
          Email
        </label>
        <input id="enq-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={field} />
      </div>
      <div>
        <label htmlFor="enq-destination" className={label}>
          Destination
        </label>
        <select id="enq-destination" name="destination" className={`${field} [&>option]:text-ink`} defaultValue="Not sure yet">
          <option>Not sure yet</option>
          {destinations.map((d) => (
            <option key={d.name}>{d.name}</option>
          ))}
          <option>Multi-country</option>
        </select>
      </div>
      <div>
        <label htmlFor="enq-when" className={label}>
          When
        </label>
        <select id="enq-when" name="when" className={`${field} [&>option]:text-ink`} defaultValue={months[0]}>
          {months.map((m) => (
            <option key={m}>{m}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="enq-message" className={label}>
          Tell us about your dream trip
        </label>
        <textarea id="enq-message" name="message" rows={3} placeholder="Group size, fitness level, must-sees…" className={`${field} resize-none`} />
      </div>
      <button
        type="submit"
        className="group flex items-center justify-between rounded-full bg-navy py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-saffron sm:col-span-2"
      >
        Send enquiry
        <span className="grid size-10 place-items-center rounded-full bg-white text-navy transition-[rotate,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold">
          <ArrowUpRight className="size-4" />
        </span>
      </button>
    </form>
  );
}
