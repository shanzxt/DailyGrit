import ModalWrapper, { ModalList } from "./ModalWrapper.jsx";
import { useStudio } from "../../context/studio.js";

export default function DeliverablesModal({ onClose }) {
  const { reduced } = useStudio();

  const goToContact = () => {
    onClose();
    setTimeout(
      () => document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }),
      120
    );
  };

  return (
    <ModalWrapper title="What every build includes" kicker="Same floor on all three tiers" onClose={onClose}>
      <p>
        Tiers differ in scope, not in care. Whatever the size of the project, these are in the price
        rather than quoted as extras later.
      </p>

      <h3>Design</h3>
      <ModalList
        items={[
          "Original layouts built around your content — no template, no page builder",
          "A type and colour system you can keep using after we are gone",
          "Every screen designed for phones first, then widened",
          "One structured round of revisions per stage, agreed up front",
        ]}
      />

      <h3>Build</h3>
      <ModalList
        items={[
          "Hand-written front-end, tested on real Android and iOS devices",
          "Accessible markup: keyboard navigation, focus states, sensible contrast",
          "Speed budget — images sized and served in modern formats",
          "Forms that reach a real inbox, with spam handling that does not annoy people",
        ]}
      />

      <h3>Launch and after</h3>
      <ModalList
        items={[
          "Domain, DNS, SSL and hosting set up in your own accounts",
          "Analytics and search console connected, with the basics already configured",
          "A written handover guide plus a walkthrough call",
          "Two weeks of fixes after launch at no cost",
        ]}
      />

      <h3>Not included unless we say so</h3>
      <p>
        Photography, illustration, copywriting from scratch, ongoing content updates, and paid
        third-party tools. We will flag any of these during discovery and price them separately
        rather than hide them in the total.
      </p>

      <div className="mdl-foot">
        <button type="button" className="btn btn-primary" onClick={goToContact}>
          Start a project
        </button>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </ModalWrapper>
  );
}
