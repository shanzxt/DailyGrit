import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { CURRENCIES } from "../data/site.js";
import { useStudio } from "../context/studio.js";

/** Round to a sensible increment so converted prices do not read like exchange output. */
function tidy(value, step) {
  return Math.max(step, Math.round(value / step) * step);
}

export function convert(priceINR, code) {
  const c = CURRENCIES[code];
  return tidy(priceINR * c.rate, c.step);
}

/**
 * A price that springs from its old value to its new one when the
 * currency changes, with tabular figures so nothing jumps sideways.
 */
export default function Price({ amountINR, className = "" }) {
  const { currency, reduced } = useStudio();
  const c = CURRENCIES[currency];
  const target = convert(amountINR, currency);

  const raw = useMotionValue(target);
  const spring = useSpring(raw, { stiffness: 120, damping: 20, mass: 0.6 });
  const text = useTransform(spring, (v) =>
    Math.round(v).toLocaleString(c.locale, { maximumFractionDigits: 0 })
  );

  useEffect(() => {
    if (reduced) {
      raw.jump?.(target);
      spring.jump?.(target);
    }
    raw.set(target);
  }, [target, raw, spring, reduced]);

  if (amountINR === 0) return <span className={className}>Free</span>;

  return (
    <span className={`price ${className}`}>
      <span className="price-symbol">{c.symbol}</span>
      <motion.span className="mono price-figure">{text}</motion.span>
    </span>
  );
}
