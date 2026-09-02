import ModalWrapper, { ModalStat, ModalList } from "./ModalWrapper.jsx";

export default function EshaniModal({ onClose }) {
  return (
    <ModalWrapper title="Eshani Somwanshi" kicker="Portfolio site · 2025" onClose={onClose}>
      <p>
        A personal site for a working creative. One scroll, no menu to get lost in, and nothing on
        the page competing with the work itself.
      </p>

      <ModalStat
        items={[
          { k: "Shape", v: "Single scroll" },
          { k: "Load", v: "Under 1s" },
          { k: "Our role", v: "Design and build" },
        ]}
      />

      <h3>The brief</h3>
      <p>
        Replace a scattered set of social profiles with one address that a client or a collaborator
        can be sent to, and that reads well on a phone in a lift.
      </p>

      <h3>Decisions worth stealing</h3>
      <ModalList
        items={[
          { k: "No hero video.", v: " The first screen is the work, at full width, with type doing the introducing." },
          { k: "Hand-built, not templated.", v: " No page builder means nothing to renew and nothing to migrate off later." },
          { k: "Images done properly.", v: " Modern formats and sizing, so the site opens fast on Indian mobile data." },
          { k: "Owned outright.", v: " The repo and the domain sit in her accounts, not ours." },
        ]}
      />

      <div className="mdl-foot">
        <a className="btn btn-primary" href="https://eshanisomwanshi.com" target="_blank" rel="noreferrer noopener">
          Visit eshanisomwanshi.com
        </a>
        <a className="btn btn-ghost" href="https://github.com/shanzxt/EshaniWebsite" target="_blank" rel="noreferrer noopener">
          See the code
        </a>
      </div>
    </ModalWrapper>
  );
}
