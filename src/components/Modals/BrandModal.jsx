import ModalWrapper, { ModalList } from "./ModalWrapper.jsx";

export default function BrandModal({ onClose }) {
  return (
    <ModalWrapper title="Brand systems" kicker="Identity work · Ongoing" onClose={onClose}>
      <p>
        Before DailyGrit, Aastha spent years inside agencies building identity systems for
        healthcare, insurance and EdTech clients — the sectors where a design has to survive
        compliance review and still feel like something a person made.
      </p>

      <h3>What that work involves</h3>
      <ModalList
        items={[
          { k: "Identity.", v: " Logo, type, colour and the rules that keep them consistent when twenty people are using them." },
          { k: "Layout systems.", v: " Grids and components that hold up across a pitch deck, a hoarding and a landing page." },
          { k: "Campaign direction.", v: " Art direction across formats, so a campaign reads as one thing rather than five." },
          { k: "Handover kits.", v: " Files and guidance an in-house team can actually use without calling the designer." },
        ]}
      />

      <h3>Why it sits under every site we build</h3>
      <p>
        Most sites that look generic are not badly built — they were never given a visual system to
        build from. We do that part first, which is why our sites do not look like each other.
      </p>

      <div className="mdl-foot">
        <a className="btn btn-primary" href="https://aasthagupta.framer.website" target="_blank" rel="noreferrer noopener">
          Aastha's portfolio
        </a>
        <a className="btn btn-ghost" href="https://behance.net/aasthagupta33" target="_blank" rel="noreferrer noopener">
          Behance
        </a>
      </div>
    </ModalWrapper>
  );
}
