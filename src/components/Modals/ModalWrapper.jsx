import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import "./ModalWrapper.css";

const SPRING = { type: "spring", stiffness: 260, damping: 26, mass: 0.8 };

/**
 * Backdrop + panel. Closes on Escape, on backdrop click, and on the X.
 * Keeps focus inside while open and returns it on close.
 */
export default function ModalWrapper({ title, kicker, onClose, children }) {
  const panel = useRef(null);
  const opener = useRef(null);

  useEffect(() => {
    opener.current = document.activeElement;
    panel.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = panel.current?.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener.current?.focus?.();
    };
  }, [onClose]);

  return createPortal(
    <motion.div
      className="mdl-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="mdl"
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 12 }}
        transition={SPRING}
      >
        <header className="mdl-head">
          <div>
            {kicker && <span className="marker">{kicker}</span>}
            <h2 className="mdl-title">{title}</h2>
          </div>
          <button type="button" className="mdl-close" onClick={onClose} aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="mdl-body">{children}</div>
      </motion.div>
    </motion.div>,
    document.body
  );
}

/** Small helpers so each modal reads as content, not markup. */
export function ModalStat({ items }) {
  return (
    <dl className="mdl-stats">
      {items.map((i) => (
        <div key={i.k}>
          <dt className="mono">{i.k}</dt>
          <dd>{i.v}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ModalList({ items }) {
  return (
    <ul className="mdl-list">
      {items.map((i) => (
        <li key={typeof i === "string" ? i : i.k}>
          {typeof i === "string" ? (
            i
          ) : (
            <>
              <strong>{i.k}</strong>
              {i.v}
            </>
          )}
        </li>
      ))}
    </ul>
  );
}
