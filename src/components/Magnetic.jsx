import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStudio } from "../context/studio.js";

/**
 * Wraps any element so it leans toward the pointer, then springs back.
 * <Magnetic><button className="btn">Go</button></Magnetic>
 */
export default function Magnetic({ children, strength = 0.35, className = "" }) {
  const { reduced } = useStudio();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 16, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 16, mass: 0.5 });

  if (reduced) return <span className={className}>{children}</span>;

  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      data-magnetic
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.span>
  );
}
