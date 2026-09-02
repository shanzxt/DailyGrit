import ModalWrapper, { ModalStat, ModalList } from "./ModalWrapper.jsx";
import Price from "../Price.jsx";
import { useStudio } from "../../context/studio.js";

export default function DiagnosticModal({ onClose }) {
  const { reduced } = useStudio();

  const goToContact = () => {
    onClose();
    setTimeout(
      () => document.getElementById("contact")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }),
      120
    );
  };

  return (
    <ModalWrapper title="Website diagnostic" kicker="One week · fee credited to the build" onClose={onClose}>
      <p>
        A written audit of the site you already have. We go through it the way a first-time visitor
        would, then tell you exactly what to change and in what order.
      </p>

      <ModalStat
        items={[
          { k: "Fee", v: <Price amountINR={12000} /> },
          { k: "Turnaround", v: "One week" },
          { k: "Format", v: "PDF + call" },
        ]}
      />

      <h3>What you get</h3>
      <ModalList
        items={[
          { k: "Page-by-page review.", v: " Annotated screenshots showing where attention goes and where people give up." },
          { k: "Technical health.", v: " Load speed, mobile behaviour, broken states, search basics and anything actively hurting you." },
          { k: "Enquiry path.", v: " Every route from landing to contacting you, and where that path breaks." },
          { k: "Prioritised fix list.", v: " Ordered by what it costs versus what it returns — usable by us, your team, or anyone else." },
          { k: "A half-hour call.", v: " To walk through it and answer whatever the document did not." },
        ]}
      />

      <h3>The honest part</h3>
      <p>
        Sometimes the answer is that your site is fine and the problem is elsewhere. We will say so.
        If you go ahead with a build within ninety days, the fee comes off that invoice.
      </p>

      <div className="mdl-foot">
        <button type="button" className="btn btn-primary" onClick={goToContact}>
          Book a diagnostic
        </button>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Not yet
        </button>
      </div>
    </ModalWrapper>
  );
}
