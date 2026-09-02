import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { FAQ } from "../data/site.js";
import Reveal from "./Reveal.jsx";
import ScrollWords from "./ScrollWords.jsx";
import "./Faq.css";

export default function Faq() {
  const [open, setOpen] = useState(null);

  return (
    <section className="band" id="faq">
      <div className="shell faq-grid">
        <Reveal className="band-head faq-head">
          <span className="eyebrow">Questions we actually get</span>
          <h2><ScrollWords text="The things people ask before they email us." /></h2>
        </Reveal>

        <div className="faq-list">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} delay={i * 0.04} className="faq-item">
                <h3>
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span>{item.q}</span>
                    <motion.span
                      className="faq-icon"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    >
                      <Plus size={17} aria-hidden="true" />
                    </motion.span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="faq-a"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 240, damping: 30 }}
                    >
                      <p>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
