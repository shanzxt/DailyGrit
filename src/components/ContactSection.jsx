import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, Check, AlertCircle } from "lucide-react";
import { OFFERS, STUDIO } from "../data/site.js";
import { useStudio } from "../context/studio.js";
import Reveal from "./Reveal.jsx";
import ScrollWords from "./ScrollWords.jsx";
import Magnetic from "./Magnetic.jsx";
import "./ContactSection.css";

/* Set VITE_FORM_ENDPOINT in Vercel to post somewhere (Formspree, Basin,
   your own function). With no endpoint set, the form opens the visitor's
   mail client with everything filled in — so it always works. */
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || "";

const EMPTY = { name: "", email: "", site: "", need: "teardown", brief: "", company: "" };

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Tell us who you are.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = "That email address will not reach you.";
  if (v.need === "teardown" && !v.site.trim()) e.site = "We need a link to record the teardown.";
  if (v.brief.trim().length < 20) e.brief = "A couple of sentences, so the first reply is useful.";
  return e;
}

export default function ContactSection() {
  const { teardownUrl } = useStudio();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    if (teardownUrl) setValues((v) => ({ ...v, site: teardownUrl, need: "teardown" }));
  }, [teardownUrl]);

  const set = (key) => (e) => {
    const val = e.target.value;
    setValues((v) => ({ ...v, [key]: val }));
    setErrors((x) => (x[key] ? { ...x, [key]: undefined } : x));
  };

  const submit = async (e) => {
    e.preventDefault();
    if (values.company) return; // honeypot: bots fill this, people never see it
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      document.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    const label = OFFERS.find((o) => o.id === values.need)?.name || values.need;

    if (!ENDPOINT) {
      const body = [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Site: ${values.site || "—"}`,
        `Interested in: ${label}`,
        "",
        values.brief,
      ].join("\n");
      window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(
        `${label} — ${values.name}`
      )}&body=${encodeURIComponent(body)}`;
      setState("sent");
      return;
    }

    try {
      setState("sending");
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...values, interest: label }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState("sent");
      setValues(EMPTY);
    } catch {
      setState("error");
    }
  };

  const field = (key) => ({
    id: `f-${key}`,
    name: key,
    value: values[key],
    onChange: set(key),
    "aria-invalid": errors[key] ? "true" : undefined,
    "aria-describedby": errors[key] ? `e-${key}` : undefined,
  });

  const err = (key) =>
    errors[key] ? (
      <span className="form-err" id={`e-${key}`}>
        <AlertCircle size={13} aria-hidden="true" />
        {errors[key]}
      </span>
    ) : null;

  return (
    <section className="band" id="contact">
      <div className="shell contact-grid">
        <Reveal className="contact-intro">
          <span className="eyebrow">Start here</span>
          <h2><ScrollWords text="Send us the link. We will send back the teardown." /></h2>
          <p>
            Or describe the project and we will tell you what it takes, what it costs, and when we
            could start. Either way a person reads it — usually within a working day.
          </p>
          <p className="contact-direct">
            Prefer email? <a href={`mailto:${STUDIO.email}`}>{STUDIO.email}</a>
          </p>
        </Reveal>

        <Reveal className="form-wrap panel" delay={0.08}>
          <AnimatePresence mode="wait">
            {state === "sent" ? (
              <motion.div
                key="done"
                className="form-done"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", stiffness: 220, damping: 22 }}
              >
                <span className="form-done-mark">
                  <Check size={22} aria-hidden="true" />
                </span>
                <h3>That is with us.</h3>
                <p>
                  {ENDPOINT
                    ? "You will hear back within a working day. If it is a teardown, the video follows within 48 hours."
                    : "Your mail app should be open with the brief filled in — send it and we will take it from there."}
                </p>
                <button type="button" className="btn btn-ghost" onClick={() => setState("idle")}>
                  Send another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="form"
                onSubmit={submit}
                noValidate
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="form-row">
                  <label htmlFor="f-name">Your name</label>
                  <input type="text" autoComplete="name" placeholder="Priya Rao" {...field("name")} />
                  {err("name")}
                </div>

                <div className="form-row">
                  <label htmlFor="f-email">Email</label>
                  <input type="email" autoComplete="email" placeholder="you@company.com" {...field("email")} />
                  {err("email")}
                </div>

                <div className="form-row">
                  <label htmlFor="f-site">Current website</label>
                  <input type="text" inputMode="url" placeholder="yoursite.com — or leave blank" {...field("site")} />
                  {err("site")}
                </div>

                <div className="form-row">
                  <label htmlFor="f-need">What you are after</label>
                  <select {...field("need")}>
                    {OFFERS.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div className="form-row form-row-wide">
                  <label htmlFor="f-brief">What are you trying to fix?</label>
                  <textarea rows={4} placeholder="Two or three sentences is plenty." {...field("brief")} />
                  {err("brief")}
                </div>

                <input
                  className="sr-only"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  placeholder="Leave this empty"
                  {...field("company")}
                />

                <div className="form-foot">
                  <Magnetic strength={0.16}>
                    <button type="submit" className="btn btn-primary" disabled={state === "sending"}>
                      {state === "sending" ? "Sending…" : "Send the brief"}
                      <Send size={15} aria-hidden="true" />
                    </button>
                  </Magnetic>
                  {state === "error" && (
                    <span className="form-err">
                      <AlertCircle size={13} aria-hidden="true" />
                      That did not go through. Email {STUDIO.email} and we will pick it up there.
                    </span>
                  )}
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
