import { motion } from "framer-motion";
import { useStudio } from "../context/studio.js";

const SPRING = { type: "spring", stiffness: 90, damping: 20, mass: 0.8 };

/**
 * Scroll-triggered spring reveal. Children stagger when `stagger` is set.
 * Falls back to a plain element when the visitor prefers reduced motion.
 */
export default function Reveal({ children, as = "div", className = "", delay = 0, y = 26, ...rest }) {
  const { reduced } = useStudio();
  const Tag = motion[as] || motion.div;

  if (reduced) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ ...SPRING, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export const stagger = (staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { staggerChildren } },
});

export const child = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: SPRING },
};
