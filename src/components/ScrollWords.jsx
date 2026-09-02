import { motion } from "framer-motion";
import { useStudio } from "../context/studio.js";

/**
 * Splits text into letters that fall into place as the heading scrolls
 * into view. Drop this in anywhere you'd normally put a heading string:
 *   <h2><ScrollWords text="Selected work" /></h2>
 */
export default function ScrollWords({ text, className = "", stagger = 0.018 }) {
  const { reduced } = useStudio();
  if (reduced) return <span className={className}>{text}</span>;

  const words = text.split(" ");
  let i = 0;

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((letter) => {
            const delay = i++ * stagger;
            return (
              <motion.span
                key={i}
                aria-hidden="true"
                style={{ display: "inline-block" }}
                initial={{ y: "0.9em", rotate: 6, opacity: 0 }}
                whileInView={{ y: "0em", rotate: 0, opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ type: "spring", stiffness: 280, damping: 20, delay }}
              >
                {letter}
              </motion.span>
            );
          })}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
