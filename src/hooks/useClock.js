import { useEffect, useState } from "react";

/** Ticks once a second. Returns a live Date. */
export function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/** Local wall-clock parts for any IANA timezone. */
export function partsIn(date, timeZone) {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    weekday: "short",
    hour12: false,
  });
  const out = {};
  for (const p of fmt.formatToParts(date)) out[p.type] = p.value;
  return {
    hour: out.hour === "24" ? "00" : out.hour,
    minute: out.minute,
    second: out.second,
    weekday: out.weekday,
  };
}

/** Offset of a timezone from UTC, in hours (can be fractional). */
export function offsetHours(date, timeZone) {
  const asUTC = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
  const asZone = new Date(date.toLocaleString("en-US", { timeZone }));
  return Math.round(((asZone - asUTC) / 3600000) * 4) / 4;
}
