import ModalWrapper, { ModalStat, ModalList } from "./ModalWrapper.jsx";

export default function QuelesslyModal({ onClose }) {
  return (
    <ModalWrapper title="Quelessly" kicker="Product build · 2025—26" onClose={onClose}>
      <p>
        A QR ordering system for restaurants, live in Pune. A guest scans the code on the table,
        browses the menu, orders and pays without waiting for anyone. The kitchen and the floor staff
        run the whole service from one screen.
      </p>

      <ModalStat
        items={[
          { k: "Live in", v: "Pune" },
          { k: "Surfaces", v: "Guest + staff" },
          { k: "Our role", v: "Design and build" },
        ]}
      />

      <h3>The problem</h3>
      <p>
        Small restaurants lose covers to the gap between a table filling up and someone taking the
        order. Off-the-shelf ordering apps solve it by taking a cut of every bill and putting their
        own brand between the restaurant and the guest.
      </p>

      <h3>What we built</h3>
      <ModalList
        items={[
          { k: "Guest ordering.", v: " No app install, no login — the menu opens from the QR code in under a second on a bad connection." },
          { k: "Live kitchen view.", v: " Orders land in sequence with table numbers and timing, so nothing is lost between floor and pass." },
          { k: "Menu control.", v: " Staff mark items unavailable in one tap; the guest menu updates immediately." },
          { k: "Payments and bills.", v: " Split-friendly billing that matches how people actually eat together." },
        ]}
      />

      <h3>Why it matters for your project</h3>
      <p>
        Quelessly is the reason we can quote a product build with a straight face. It is not a
        prototype — it takes real orders, from real people, on restaurant wifi.
      </p>

      <div className="mdl-foot">
        <a className="btn btn-primary" href="https://quelessly.com" target="_blank" rel="noreferrer noopener">
          Visit quelessly.com
        </a>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </ModalWrapper>
  );
}
