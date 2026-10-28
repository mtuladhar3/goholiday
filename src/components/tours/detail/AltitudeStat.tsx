"use client";

import { useState } from "react";
import Stat from "./Stat";

const EVEREST = 8849;
const FT_PER_M = 3.28084;
const units = ["m", "ft"] as const;

/** Max-altitude stat with an m / ft switch beside its label. */
export default function AltitudeStat({ metres }: { metres: number }) {
  const [unit, setUnit] = useState<(typeof units)[number]>("m");
  const value = unit === "m" ? metres : Math.round(metres * FT_PER_M);
  const ofEverest = Math.round((metres / EVEREST) * 100);

  return (
    <Stat
      label="Max altitude"
      action={
        <span role="group" aria-label="Altitude unit" className="flex rounded-full border border-mist p-0.5 text-xs font-medium">
          {units.map((u) => (
            <button
              key={u}
              type="button"
              aria-pressed={unit === u}
              onClick={() => setUnit(u)}
              className={`rounded-full px-2.5 py-0.5 transition-colors ${unit === u ? "bg-navy text-white" : "text-stone hover:text-navy"}`}
            >
              {u}
            </button>
          ))}
        </span>
      }
      foot={
        <div>
          <div className="relative h-1.5 rounded-full bg-mist">
            <span className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-gold to-saffron" style={{ width: `${ofEverest}%` }} />
          </div>
          <p className="mt-2 text-xs text-stone">{ofEverest}% of Everest&apos;s summit height</p>
        </div>
      }
    >
      <span className="type-stat">{value.toLocaleString("en-US")}</span>
      <span className="text-lg text-stone">{unit}</span>
    </Stat>
  );
}
