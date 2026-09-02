import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useStudio } from "../context/studio.js";
import Magnetic from "./Magnetic.jsx";
import "./Hero.css";

/* Each line is its own array of { text, accent } so "digital products"
   can be coloured while the rest of the line stays white. */
const LINES = [
  [{ text: "We" }, { text: "design" }, { text: "&" }, { text: "build" }],
  [{ text: "standout" }, { text: "digital", accent: true }, { text: "products", accent: true }],
  [{ text: "for" }, { text: "ambitious" }, { text: "brands." }],
];

const SPRING = { type: "spring", stiffness: 110, damping: 19, mass: 0.9 };

const FACTS = [
  { value: "2-4 Wks", label: "Fast Turnaround" },
  { value: "100%", label: "IP & Code Ownership" },
  { value: "Fixed", label: "Upfront Pricing" },
  { value: "Direct", label: "Founder Collaboration" },
];

export default function Hero() {
  const { setTeardownUrl, reduced } = useStudio();
  const [url, setUrl] = useState("");
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 420], [1, 0]);
  const drift = useTransform(scrollY, [0, 420], [0, 60]);

  const submit = (e) => {
    e.preventDefault();
    setTeardownUrl(url.trim());
    document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  let wordIndex = 0;
  const word = ({ text, accent }) => {
    const delay = 0.2 + wordIndex++ * 0.06;
    return (
      <span key={text} className={accent ? "hero-word hero-word-accent" : "hero-word"}>
        <motion.span
          initial={{ y: "108%", rotate: 3 }}
          animate={{ y: "0%", rotate: 0 }}
          transition={{ ...SPRING, delay }}
        >
          {text}
        </motion.span>
      </span>
    );
  };

  return (
    <section className="hero" id="top">
      <div className="shell hero-inner">
        <motion.p
          className="hero-pill"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, ...SPRING }}
        >
          <span className="hero-pill-dot" aria-hidden="true" />
          Launch Offer: 2 Slots Open @ Launch Rates (Nov 30 Deadline)
        </motion.p>

        <h1 className="hero-head">
          {LINES.map((line, li) => (
            <span className="hero-line" key={li}>
              {line.map((w) => word(w))}
            </span>
          ))}
        </h1>

        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ...SPRING }}
        >
          A boutique two-person studio in Pune. One design partner leading creative direction & UI,
          one engineering partner leading architecture & delivery. Zero middlemen. Guaranteed
          timelines.
        </motion.p>

        <motion.form
          className="hero-bar"
          onSubmit={submit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, ...SPRING }}
        >
          <div className="hero-bar-copy">
            <p className="hero-bar-q">Want a free 3-minute video teardown of your website?</p>
            <p className="hero-bar-sub">
              Send us your link — we&rsquo;ll record a screen video showing what&rsquo;s slow, broken
              on mobile, and losing you enquiries. No pitch.
            </p>
            <label className="sr-only" htmlFor="hero-url">
              Your website address
            </label>
            <input
              id="hero-url"
              type="text"
              inputMode="url"
              placeholder="yoursite.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              autoComplete="url"
            />
          </div>
          <Magnetic strength={0.2}>
            <button type="submit" className="btn btn-amber">
              Claim Free Teardown
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </Magnetic>
        </motion.form>

        <motion.div
          className="hero-ctas"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, ...SPRING }}
        >
          <Magnetic strength={0.2}>
            <a className="btn btn-light" href="#work">
              Explore Selected Work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a className="btn" href="#pricing">
              View Pricing Ladder
            </a>
          </Magnetic>
        </motion.div>

        <motion.dl className="hero-facts" style={reduced ? undefined : { opacity: fade, y: drift }}>
          {FACTS.map((f, i) => (
            <motion.div
              key={f.value}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 + i * 0.07, ...SPRING }}
            >
              <dd>{f.value}</dd>
              <dt className="mono">{f.label}</dt>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}