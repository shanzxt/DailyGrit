import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useStudio } from "../context/studio.js";
import Magnetic from "./Magnetic.jsx";
import "./Hero.css";

const LINE_1 = ["We", "design", "it,"];
const LINE_2 = ["then", "we", "build", "it."];
const SPRING = { type: "spring", stiffness: 110, damping: 19, mass: 0.9 };

const FACTS = [
  { k: "Studio size", v: "Two people" },
  { k: "First page live", v: "7 days" },
  { k: "Based in", v: "Pune, IST" },
  { k: "Handover", v: "You own everything" },
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

  const word = (w, i, offset = 0) => (
    <span key={`${w}-${i}`} className="hero-word">
      <motion.span
        initial={{ y: "108%", rotate: 3 }}
        animate={{ y: "0%", rotate: 0 }}
        transition={{ ...SPRING, delay: 0.25 + (i + offset) * 0.07 }}
      >
        {w}
      </motion.span>
    </span>
  );

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
          Launch offer — 2 slots open at launch rates
        </motion.p>

        <h1 className="hero-head">
          <span className="hero-line">{LINE_1.map((w, i) => word(w, i))}</span>
          <span className="hero-line hero-line-alt">{LINE_2.map((w, i) => word(w, i, LINE_1.length))}</span>
        </h1>

        <motion.p
          className="hero-lede"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, ...SPRING }}
        >
          DailyGrit is a two-person studio in Pune. Aastha designs it, Shan builds it, and you get
          a site you own outright — not a template with your logo dropped in.
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
              Claim free teardown
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
              Explore selected work
              <ArrowRight size={16} aria-hidden="true" />
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a className="btn" href="#pricing">
              View pricing ladder
            </a>
          </Magnetic>
        </motion.div>

        <motion.dl className="hero-facts" style={reduced ? undefined : { opacity: fade, y: drift }}>
          {FACTS.map((f, i) => (
            <motion.div
              key={f.k}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15 + i * 0.07, ...SPRING }}
            >
              <dt className="mono">{f.k}</dt>
              <dd>{f.v}</dd>
            </motion.div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
