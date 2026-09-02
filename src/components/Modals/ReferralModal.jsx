import ModalWrapper, { ModalList } from "./ModalWrapper.jsx";
import { REFERRAL, STUDIO } from "../../data/site.js";

export default function ReferralModal({ onClose }) {
  return (
    <ModalWrapper title="Referral partners" kicker={`${REFERRAL.cut} of the project fee`} onClose={onClose}>
      <p>
        We would rather pay the person who introduced us than an ad platform. If someone you send
        becomes a client, a tenth of what they pay us goes to you.
      </p>

      <ModalList items={REFERRAL.points} />

      <h3>Who this tends to suit</h3>
      <p>
        Freelance designers who do not build, developers who do not design, accountants and
        consultants whose clients keep asking about their website, and anyone who has already sent
        someone our way once.
      </p>

      <div className="mdl-foot">
        <a className="btn btn-primary" href={`mailto:${STUDIO.email}?subject=Referral`}>
          Introduce someone
        </a>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Close
        </button>
      </div>
    </ModalWrapper>
  );
}
