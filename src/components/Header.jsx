import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useStudio } from "../context/studio.js";
import { THEMES } from "../hooks/useTheme.js";
import Magnetic from "./Magnetic.jsx";
import "./Header.css";

const NAV = [
  { href: "#work", label: "Work" },
  { href: "#pricing", label: "Offers & Pricing" },
  { href: "#process", label: "Process" },
  { href: "#studio", label: "Studio" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const { theme, setTheme } = useStudio();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (v) => setStuck(v > 24));

  return (
    <motion.header
      className="hdr"
      data-stuck={stuck}
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 90, damping: 18, delay: 0.15 }}
    >
      <motion.div className="hdr-progress" style={{ scaleX: progress }} />

      <div className="shell hdr-inner">
        <a className="hdr-mark" href="#top" aria-label="DailyGrit Studio, back to top">
          <span className="hdr-mark-icon" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="hdr-mark-name">DailyGrit</span>
        </a>

        <nav className="hdr-nav" aria-label="Sections">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>

        <div className="hdr-right">
          <div className="theme-picker" role="group" aria-label="Colour theme">
            {THEMES.map((t) => (
              <button
                key={t.id}
                type="button"
                className="theme-dot"
                data-theme-id={t.id}
                aria-pressed={theme === t.id}
                aria-label={`${t.label} theme`}
                title={t.label}
                onClick={() => setTheme(t.id)}
              >
                {theme === t.id && (
                  <motion.span layoutId="theme-halo" className="theme-halo" transition={{ type: "spring", stiffness: 400, damping: 30 }} />
                )}
              </button>
            ))}
          </div>

          <Magnetic className="hdr-cta">
            <a className="btn btn-primary" href="#contact">
              Get in touch
            </a>
          </Magnetic>

          <button
            type="button"
            className="hdr-burger"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="hdr-sheet"
            aria-label="Sections"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 28 }}
          >
            <div className="shell hdr-sheet-inner">
              {NAV.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
                  {n.label}
                </a>
              ))}
              <a className="btn btn-primary" href="#contact" onClick={() => setOpen(false)}>
                Get in touch
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
