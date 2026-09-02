import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WORKS } from "../data/site.js";
import { useStudio } from "../context/studio.js";
import Reveal from "./Reveal.jsx";
import ScrollWords from "./ScrollWords.jsx";
import "./SelectedWorks.css";

function WorkCard({ work, index }) {
  const { openModal, reduced } = useStudio();
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [7, -7]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-9, 9]), { stiffness: 200, damping: 18 });

  const onMove = (e) => {
    if (reduced) return;
    const r = ref.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <Reveal delay={index * 0.08} className="work-slot">
      <motion.article
        ref={ref}
        className="work"
        onPointerMove={onMove}
        onPointerLeave={reset}
        style={reduced ? undefined : { rotateX: rx, rotateY: ry, transformPerspective: 900 }}
        whileHover={reduced ? undefined : { y: -6, rotate: index % 2 === 0 ? -1.2 : 1.2, scale: 1.015 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <span className="work-spot" aria-hidden="true" />

        <div className="work-mock" aria-hidden="true">
          <span className="work-mock-dot" />
          <span className="work-mock-dot" />
          <span className="work-mock-dot" />
          <span className="work-mock-bar work-mock-bar-accent" style={{ width: `${55 + index * 12}%` }} />
          <span className="work-mock-bar" style={{ width: "88%" }} />
          <span className="work-mock-bar" style={{ width: "62%" }} />
        </div>
        <p className="work-caption eyebrow">{work.name.toUpperCase()}</p>

        <header className="work-head">
          <span className="work-kind">{work.kind}</span>
          <span className="marker">{work.year}</span>
        </header>

        <h3 className="work-name">{work.name}</h3>
        <p className="work-summary">{work.summary}</p>

        <dl className="work-stats">
          {work.stats.map((s) => (
            <div key={s.k}>
              <dt className="mono">{s.k}</dt>
              <dd>{s.v}</dd>
            </div>
          ))}
        </dl>

        <footer className="work-foot">
          <button type="button" className="btn btn-ghost" onClick={() => openModal(work.modal)}>
            Read the story
          </button>
          {work.href && (
            <a className="work-live" href={work.href} target="_blank" rel="noreferrer noopener">
              Visit site
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </footer>
      </motion.article>
    </Reveal>
  );
}

export default function SelectedWorks() {
  return (
    <section className="band" id="work">
      <div className="shell">
        <Reveal className="band-head">
          <span className="eyebrow">Proof of craft</span>
          <h2><ScrollWords text="Shipped products and live builds." /></h2>
          <p>We let working software and real digital experiences do the talking.</p>
        </Reveal>

        <div className="work-grid">
          {WORKS.map((w, i) => (
            <WorkCard key={w.id} work={w} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
