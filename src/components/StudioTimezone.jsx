import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { FOUNDERS, STUDIO } from "../data/site.js";
import { useClock, partsIn, offsetHours } from "../hooks/useClock.js";
import Reveal from "./Reveal.jsx";
import ScrollWords from "./ScrollWords.jsx";
import "./StudioTimezone.css";

/* We work 10:00–19:00 IST. Shown against the visitor's own clock. */
const WORK_START = 10;
const WORK_END = 19;

function Clock({ label, zone, now }) {
  const p = partsIn(now, zone);
  return (
    <div className="clock">
      <span className="marker">{label}</span>
      <p className="clock-time mono">
        {p.hour}
        <span className="clock-colon">:</span>
        {p.minute}
        <span className="clock-secs">{p.second}</span>
      </p>
      <span className="clock-zone">
        {p.weekday} · {zone.replace("_", " ")}
      </span>
    </div>
  );
}

export default function StudioTimezone() {
  const now = useClock();
  const visitorZone = useMemo(
    () => Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
    []
  );

  const { window: overlap, sameZone, open } = useMemo(() => {
    const studioOffset = offsetHours(now, STUDIO.timezone);
    const visitorOffset = offsetHours(now, visitorZone);
    const shift = visitorOffset - studioOffset;

    const wrap = (h) => ((h % 24) + 24) % 24;
    const fmt = (h) => {
      const hh = Math.floor(wrap(h));
      const mm = Math.round((wrap(h) - hh) * 60);
      return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
    };

    const istHour = Number(partsIn(now, STUDIO.timezone).hour) + Number(partsIn(now, STUDIO.timezone).minute) / 60;

    return {
      window: `${fmt(WORK_START + shift)} — ${fmt(WORK_END + shift)}`,
      sameZone: Math.abs(shift) < 0.01,
      open: istHour >= WORK_START && istHour < WORK_END,
    };
  }, [now, visitorZone]);

  return (
    <section className="band" id="studio">
      <div className="shell studio-grid">
        <Reveal className="band-head studio-head">
          <span className="eyebrow">The studio</span>
          <h2><ScrollWords text="Two people. You will always know which one you are talking to." /></h2>
          <p>
            No account managers, no handoffs to someone you have never met. We are in {STUDIO.city},
            and we keep normal hours.
          </p>
        </Reveal>

        <div className="founders">
          {FOUNDERS.map((f, i) => (
            <Reveal key={f.name} delay={i * 0.08} className="founder">
              <span className="founder-mark" aria-hidden="true">
                {f.initials}
              </span>
              <div>
                <h3 className="founder-name">{f.name}</h3>
                <p className="marker">{f.role}</p>
                <p className="founder-bio">{f.bio}</p>
                <p className="founder-links">
                  {f.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noreferrer noopener">
                      {l.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                    </a>
                  ))}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="tz panel" delay={0.1}>
          <div className="tz-clocks">
            <Clock label="Us" zone={STUDIO.timezone} now={now} />
            <span className="tz-div" aria-hidden="true" />
            <Clock label="You" zone={visitorZone} now={now} />
          </div>

          <div className="tz-meta">
            <p className="tz-status" data-open={open}>
              <span className="tz-dot" aria-hidden="true" />
              {open ? "At the desk right now" : "Off the desk — replies in the morning, IST"}
            </p>
            <p className="tz-overlap">
              {sameZone
                ? "We are in the same timezone, so anything between 10:00 and 19:00 works."
                : `In your local time we are reachable ${overlap}. Outside that, email still gets an answer within a working day.`}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
