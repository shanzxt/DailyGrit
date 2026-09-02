import { ArrowUp } from "lucide-react";
import { STUDIO } from "../data/site.js";
import { useStudio } from "../context/studio.js";
import Magnetic from "./Magnetic.jsx";
import "./Footer.css";

export default function Footer() {
  const { reduced } = useStudio();
  const year = new Date().getFullYear();

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });

  return (
    <footer className="ftr">
      <div className="shell ftr-inner">
        <div className="ftr-brand">
          <p className="ftr-mark">DailyGrit Studio</p>
          <p className="ftr-line">{STUDIO.tagline}</p>
        </div>

        <nav className="ftr-nav" aria-label="Footer">
          <a href="#work">Work</a>
          <a href="#pricing">Pricing</a>
          <a href="#process">Process</a>
          <a href="#contact">Contact</a>
          <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
          <a href={STUDIO.github} target="_blank" rel="noreferrer noopener">
            GitHub
          </a>
        </nav>

        <div className="ftr-end">
          <p className="marker">
            © {year} DailyGrit Studio · {STUDIO.city}
          </p>
          <Magnetic strength={0.25}>
            <button type="button" className="btn btn-ghost ftr-top" onClick={toTop}>
              Back to top
              <ArrowUp size={15} aria-hidden="true" />
            </button>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
