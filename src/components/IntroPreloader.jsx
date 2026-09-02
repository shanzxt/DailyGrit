import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import "./IntroPreloader.css";

const WORD = "DAILYGRIT".split("");
const SPRING = { type: "spring", stiffness: 120, damping: 18, mass: 0.9 };

/* Four panels that cover the viewport, then retract to their own corner. */
const CORNERS = [
  { id: "tl", exit: { x: "-100%", y: "-100%" } },
  { id: "tr", exit: { x: "100%", y: "-100%" } },
  { id: "bl", exit: { x: "-100%", y: "100%" } },
  { id: "br", exit: { x: "100%", y: "100%" } },
];

export default function IntroPreloader({ onDone }) {
  const [phase, setPhase] = useState("letters"); // letters -> retract

  useEffect(() => {
    const a = setTimeout(() => setPhase("retract"), 1500);
    const b = setTimeout(onDone, 2600);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  return (
    <motion.div className="intro" aria-hidden="true" initial={false} exit={{ opacity: 0 }}>
      {CORNERS.map((c, i) => (
        <motion.span
          key={c.id}
          className={`intro-panel intro-panel-${c.id}`}
          initial={{ x: 0, y: 0 }}
          animate={phase === "retract" ? c.exit : { x: 0, y: 0 }}
          transition={{ ...SPRING, stiffness: 90, damping: 20, delay: i * 0.06 }}
        />
      ))}

      <motion.div
        className="intro-word"
        animate={phase === "retract" ? { opacity: 0, y: -28, filter: "blur(6px)" } : {}}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {WORD.map((letter, i) => (
          <motion.span
            key={`${letter}-${i}`}
            className={i === 5 ? "intro-letter intro-letter-pivot" : "intro-letter"}
            initial={{ y: "110%", rotate: 8, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{ ...SPRING, delay: 0.1 + i * 0.055 }}
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        className="intro-sub mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: phase === "retract" ? 0 : 1 }}
        transition={{ delay: 0.85, duration: 0.4 }}
      >
        Design and build · Pune
      </motion.p>
    </motion.div>
  );
}
