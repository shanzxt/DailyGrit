import { createContext, useContext } from "react";

/**
 * Shared studio state: theme, currency, open modal, motion preference and
 * the URL typed into the hero teardown bar. Lives in its own module so
 * components never import App.jsx (which would be a circular import).
 */
export const StudioContext = createContext(null);

export function useStudio() {
  const value = useContext(StudioContext);
  if (!value) throw new Error("useStudio must be used inside <App />");
  return value;
}
