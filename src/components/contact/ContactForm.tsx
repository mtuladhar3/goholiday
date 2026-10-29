"use client";

import { useState, type FormEvent } from "react";
import { contactTopics } from "@/data/contact";
import { fieldClass, labelClass, pillClass } from "@/components/ui/form";
import { ArrowUpRight } from "@/components/ui/Icons";

const replyBy = ["Email", "WhatsApp", "Phone call"];

/** General contact form. Wire `onSubmit` to your email/CRM endpoint; for now it confirms locally. */
export default function ContactForm() {
  const [sent, setSent] = useState<string | null>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(String(new FormData(e.currentTarget).get("name") ?? "").split(" ")[0]);
  };

  if (sent !== null) {
    return (
      <div className="flex min-h-[520px] flex-col items-start justify-center gap-4 rounded-panel bg-paper-deep p-8 sm:p-12" role="status">
        <span className="grid size-14 place-items-center rounded-full bg-saffron text-2xl text-ink">✓</span>
        <p className="type-headline">
          Thank you{sent && `, ${sent}`}. <em>We&apos;re on it.</em>
        </p>
        <p className="max-w-md leading-relaxed text-stone">Your message is with our Kathmandu team. You&apos;ll hear back within 24 hours — usually much sooner.</p>
        <button type="button" onClick={() => setSent(null)} className="text-sm underline underline-offset-4 hover:text-navy">
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 rounded-panel bg-paper-deep p-5 sm:grid-cols-2 sm:p-8 lg:p-10">
      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>What&apos;s it about?</legend>
        <div className="flex flex-wrap gap-2">
          {contactTopics.map((t, i) => (
            <label key={t} className={pillClass}>
              <input type="radio" name="topic" value={t} defaultChecked={i === 0} className="sr-only" />
              {t}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="ct-name" className={labelClass}>Full name</label>
        <input id="ct-name" name="name" required autoComplete="name" placeholder="Your name" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="ct-email" className={labelClass}>Email</label>
        <input id="ct-email" name="email" type="email" required autoComplete="email" placeholder="you@email.com" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="ct-phone" className={labelClass}>
          Phone / WhatsApp <span className="normal-case tracking-normal">(optional)</span>
        </label>
        <input id="ct-phone" name="phone" type="tel" autoComplete="tel" placeholder="+44 7700 900000" className={fieldClass} />
      </div>
      <div>
        <label htmlFor="ct-country" className={labelClass}>Country</label>
        <input id="ct-country" name="country" autoComplete="country-name" placeholder="Where you're travelling from" className={fieldClass} />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="ct-message" className={labelClass}>Message</label>
        <textarea id="ct-message" name="message" required rows={5} placeholder="Dates, group size, questions — anything that helps." className={`${fieldClass} resize-none`} />
      </div>

      <fieldset className="sm:col-span-2">
        <legend className={labelClass}>Best way to reply</legend>
        <div className="flex flex-wrap gap-2">
          {replyBy.map((r, i) => (
            <label key={r} className={pillClass}>
              <input type="radio" name="reply" value={r} defaultChecked={i === 0} className="sr-only" />
              {r}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="flex flex-col gap-4 border-t border-ink/10 pt-5 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-sm text-xs leading-relaxed text-stone">We only use your details to answer you. No newsletters unless you ask for them.</p>
        <button
          type="submit"
          className="group flex shrink-0 items-center justify-between gap-6 rounded-full bg-navy py-1.5 pl-6 pr-1.5 text-sm font-medium text-white transition-colors hover:bg-saffron"
        >
          Send message
          <span className="grid size-10 place-items-center rounded-full bg-white text-navy transition-[rotate,background-color] duration-500 ease-expo group-hover:rotate-45 group-hover:bg-gold">
            <ArrowUpRight className="size-4" />
          </span>
        </button>
      </div>
    </form>
  );
}
