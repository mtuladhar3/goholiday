"use client";

import { useEffect, useState } from "react";
import { officeHours, TIMEZONE } from "@/data/contact";
import { Clock } from "@/components/ui/Icons";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/** Current day/hour in Kathmandu, whatever the visitor's own time zone. */
function kathmanduNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, weekday: "short", hour: "numeric", minute: "2-digit", hourCycle: "h23" }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const hour = Number(get("hour"));
  const minute = Number(get("minute"));
  const day = WEEKDAYS.indexOf(get("weekday"));
  const time = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" }).format(now);
  const slot = officeHours.find((h) => h.days.includes(day));
  const decimal = hour + minute / 60;
  const open = Boolean(slot && decimal >= slot.open && decimal < slot.close);
  return { time, open };
}

/** Live Kathmandu time and whether the office is open. Renders after mount so server and client never disagree. */
export default function KathmanduClock() {
  const [state, setState] = useState<ReturnType<typeof kathmanduNow> | null>(null);

  useEffect(() => {
    const tick = () => setState(kathmanduNow(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-4 rounded-card border border-ink/10 p-4 pr-6">
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-navy text-white">
        <Clock className="size-5" />
      </span>
      <p className="text-sm">
        <span className="block text-stone">In Kathmandu it&apos;s</span>
        <span className="type-title block tabular-nums">{state?.time ?? "—"}</span>
        <span className="mt-1 flex items-center gap-2 text-stone">
          <span className={`relative size-2 rounded-full ${state?.open ? "bg-moss" : "bg-saffron"}`}>
            {state?.open && <span className="absolute inset-0 animate-ping rounded-full bg-moss motion-reduce:hidden" />}
          </span>
          {state ? (state.open ? "We're in the office now" : "Office closed — WhatsApp still works") : "Checking office hours…"}
        </span>
      </p>
    </div>
  );
}
