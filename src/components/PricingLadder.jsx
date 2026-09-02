import { motion } from "framer-motion";
import { Check, CheckCircle2 } from "lucide-react";
import { CURRENCIES, OFFERS } from "../data/site.js";
import { useStudio } from "../context/studio.js";
import Reveal from "./Reveal.jsx";
import ScrollWords from "./ScrollWords.jsx";
import Magnetic from "./Magnetic.jsx";
import Price from "./Price.jsx";
import "./PricingLadder.css";

const CODES = Object.keys(CURRENCIES);
const diagnostic = OFFERS.find((o) => o.id === "diagnostic");
const tiers = OFFERS.filter((o) => ["onepage", "tier1", "tier2", "tier3"].includes(o.id));

function spotlight(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function DiagnosticCard() {
  const { openModal, reduced } = useStudio();

  return (
    <Reveal className="diag" onPointerMove={reduced ? undefined : spotlight}>
      <span className="offer-spot" aria-hidden="true" />
      <div className="diag-body">
        <span className="diag-tag">{diagnostic.tag}</span>
        <h3 className="diag-name">{diagnostic.name}</h3>
        <p className="diag-pitch">{diagnostic.pitch}</p>
        <p className="diag-credit">
          <CheckCircle2 size={15} aria-hidden="true" />
          {diagnostic.creditNote}
        </p>
      </div>
      <div className="diag-side">
        <p className="diag-price">
          <Price amountINR={diagnostic.priceINR} />
        </p>
        <p className="marker">{diagnostic.duration}</p>
        <Magnetic strength={0.18}>
          <button type="button" className="btn btn-light" onClick={() => openModal("diagnostic")}>
            {diagnostic.cta}
          </button>
        </Magnetic>
      </div>
    </Reveal>
  );
}

function OfferCard({ offer, index }) {
  const { openModal, reduced } = useStudio();

  const act = () => {
    if (offer.action.startsWith("modal:")) openModal(offer.action.split(":")[1]);
    else document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  };

  return (
    <Reveal delay={index * 0.06} className="offer-slot">
      <motion.article
        className="offer"
        data-highlight={offer.highlight ? "true" : "false"}
        onPointerMove={reduced ? undefined : spotlight}
        whileHover={reduced ? undefined : { y: -5, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
      >
        <span className="offer-spot" aria-hidden="true" />
        {offer.highlight && <span className="offer-flag">Most popular</span>}

        <h3 className="offer-name">{offer.name}</h3>
        <p className="offer-pitch">{offer.pitch}</p>

        <p className="offer-price">
          {offer.priceINR === 0 ? <span className="offer-free">Free</span> : <Price amountINR={offer.priceINR} />}
        </p>
        <p className="marker offer-time">{offer.duration}</p>

        {offer.launchINR != null && (
          <p className="offer-launch">
            <span aria-hidden="true">⚡</span>
            Launch rate: <Price amountINR={offer.launchINR} /> ({offer.launchNote})
          </p>
        )}
        {offer.fixedNote && <p className="offer-fixed">{offer.fixedNote}</p>}

        <ul className="offer-points">
          {offer.points.map((p) => (
            <li key={p}>
              <Check size={15} aria-hidden="true" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        <Magnetic strength={0.18} className="offer-cta">
          <button type="button" className={offer.highlight ? "btn btn-primary" : "btn"} onClick={act}>
            {offer.cta}
          </button>
        </Magnetic>
      </motion.article>
    </Reveal>
  );
}

export default function PricingLadder() {
  const { currency, setCurrency, openModal } = useStudio();

  return (
    <section className="band" id="pricing">
      <div className="shell">
        <Reveal className="band-head">
          <span className="eyebrow">Restructured offer ladder</span>
          <h2><ScrollWords text="Predictable pricing. Built to start small." /></h2>
          <p>
            We publish our pricing openly so you can self-qualify instantly. Choose the entry point
            that matches your stage.
          </p>
        </Reveal>

        <DiagnosticCard />

        <Reveal className="pricing-controls" delay={0.05}>
          <div className="cur" role="group" aria-label="Currency">
            {CODES.map((code) => (
              <button
                key={code}
                type="button"
                className="cur-btn"
                aria-pressed={currency === code}
                onClick={() => setCurrency(code)}
              >
                {currency === code && (
                  <motion.span
                    layoutId="cur-pill"
                    className="cur-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                <span>{code}</span>
              </button>
            ))}
          </div>

          <div className="pricing-links">
            <button type="button" className="btn btn-ghost" onClick={() => openModal("referral")}>
              Referral program (10% commission)
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => openModal("deliverables")}>
              Compare full deliverables
            </button>
          </div>
        </Reveal>

        <div className="offer-grid">
          {tiers.map((o, i) => (
            <OfferCard key={o.id} offer={o} index={i} />
          ))}
        </div>

        <p className="pricing-note">
          Prices convert from Indian rupees at an indicative rate and are rounded. Your invoice is
          issued in the currency we agree before the project starts.
        </p>
      </div>
    </section>
  );
}
