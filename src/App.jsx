import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { StudioContext } from "./context/studio.js";
import { useTheme } from "./hooks/useTheme.js";
import { useReducedMotion } from "./hooks/useReducedMotion.js";

import IntroPreloader from "./components/IntroPreloader.jsx";
import CursorRing from "./components/CursorRing.jsx";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import SelectedWorks from "./components/SelectedWorks.jsx";
import PricingLadder from "./components/PricingLadder.jsx";
import Process from "./components/Process.jsx";
import StudioTimezone from "./components/StudioTimezone.jsx";
import Faq from "./components/Faq.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";

import QuelesslyModal from "./components/Modals/QuelesslyModal.jsx";
import EshaniModal from "./components/Modals/EshaniModal.jsx";
import BrandModal from "./components/Modals/BrandModal.jsx";
import DiagnosticModal from "./components/Modals/DiagnosticModal.jsx";
import ReferralModal from "./components/Modals/ReferralModal.jsx";
import DeliverablesModal from "./components/Modals/DeliverablesModal.jsx";

const MODALS = {
  quelessly: QuelesslyModal,
  eshani: EshaniModal,
  brand: BrandModal,
  diagnostic: DiagnosticModal,
  referral: ReferralModal,
  deliverables: DeliverablesModal,
};

export default function App() {
  const { theme, setTheme } = useTheme();
  const reduced = useReducedMotion();
  const [intro, setIntro] = useState(() => !sessionStorage.getItem("dg-seen"));
  const [currency, setCurrency] = useState("INR");
  const [modal, setModal] = useState(null);
  const [teardownUrl, setTeardownUrl] = useState("");

  const openModal = useCallback((id) => setModal(id), []);
  const closeModal = useCallback(() => setModal(null), []);

  const finishIntro = useCallback(() => {
    sessionStorage.setItem("dg-seen", "1");
    setIntro(false);
  }, []);

  const showIntro = intro && !reduced;

  /* Lock scroll during intro and while a modal is open. */
  useEffect(() => {
    document.body.style.overflow = showIntro || modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro, modal]);

  const value = useMemo(
    () => ({
      currency,
      setCurrency,
      openModal,
      closeModal,
      reduced,
      theme,
      setTheme,
      teardownUrl,
      setTeardownUrl,
    }),
    [currency, openModal, closeModal, reduced, theme, setTheme, teardownUrl]
  );

  const ActiveModal = modal ? MODALS[modal] : null;

  return (
    <StudioContext.Provider value={value}>
      <a className="skip-link" href="#work">
        Skip to content
      </a>

      <AnimatePresence>
        {showIntro && <IntroPreloader key="intro" onDone={finishIntro} />}
      </AnimatePresence>

      <CursorRing />
      <Header />

      <main>
        <Hero />
        <Marquee />
        <SelectedWorks />
        <PricingLadder />
        <Process />
        <StudioTimezone />
        <Faq />
        <ContactSection />
      </main>

      <Footer />

      <AnimatePresence>{ActiveModal && <ActiveModal key={modal} onClose={closeModal} />}</AnimatePresence>
    </StudioContext.Provider>
  );
}
