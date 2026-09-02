import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PROCESS } from "../data/site.js";
import Reveal from "./Reveal.jsx";
import ScrollWords from "./ScrollWords.jsx";
import "./Process.css";

/** Five steps. Click one to open it; the rail marker slides with layoutId. */
export default function Process() {
  const [open, setOpen] = useState(0);

  return (
    <section className="band" id="process">
      <div className="shell">
        <Reveal className="band-head">
          <span className="eyebrow">How a project runs</span>
          <h2><ScrollWords text="Five steps, and you always know which one we are on." /></h2>
          <p>Each step says what we do and what we need from you. Nothing happens off-screen.</p>
        </Reveal>

        <ol className="proc">
          {PROCESS.map((p, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={p.step} delay={i * 0.05} className="proc-row" data-open={isOpen}>
                <button
                  type="button"
                  className="proc-btn"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="proc-rail" aria-hidden="true">
                    {isOpen && (
                      <motion.span
                        layoutId="proc-marker"
                        className="proc-marker"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </span>
                  <span className="proc-step">{p.step}</span>
                  <span className="marker proc-days">{p.days}</span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="proc-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 230, damping: 30 }}
                    >
                      <div className="proc-body-inner">
                        <p>{p.body}</p>
                        <p className="proc-yours">
                          <span className="marker">From you</span>
                          {p.yours}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
