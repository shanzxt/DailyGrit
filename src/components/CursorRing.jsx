import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useStudio } from "../context/studio.js";
import "./CursorRing.css";

/**
 * A ring that trails the pointer with spring physics and swells over
 * anything interactive. Hidden on touch devices and when motion is reduced.
 */
export default function CursorRing() {
  const { reduced } = useStudio();
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const hit = e.target.closest("a, button, [data-magnetic], input, textarea, select");
      setActive(Boolean(hit));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [reduced, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      className="cursor-ring"
      aria-hidden="true"
      style={{ left: sx, top: sy }}
      animate={{ scale: active ? 1.9 : 1, opacity: active ? 0.9 : 0.55 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    />
  );
}
