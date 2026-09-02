import { motion } from "framer-motion";
import { CAPABILITIES } from "../data/site.js";
import { useStudio } from "../context/studio.js";
import "./Marquee.css";

/** Infinite capabilities ticker. Duplicated once so the loop is seamless. */
export default function Marquee() {
  const { reduced } = useStudio();
  const row = [...CAPABILITIES, ...CAPABILITIES];

  return (
    <section className="marq" aria-label="What we do">
      <motion.div
        className="marq-track"
        animate={reduced ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
      >
        {row.map((c, i) => (
          <span className="marq-item" key={`${c}-${i}`}>
            {c}
            <i className="marq-dot" aria-hidden="true" />
          </span>
        ))}
      </motion.div>
    </section>
  );
}
