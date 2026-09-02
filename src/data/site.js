/* ============================================================
   All copy and content for the site lives here.
   Edit this file to change the site — components read from it.
   ============================================================ */

export const STUDIO = {
  name: "DailyGrit Studio",
  domain: "dailygrit.studio",
  email: "hello@dailygrit.studio",
  city: "Pune, India",
  timezone: "Asia/Kolkata",
  github: "https://github.com/shanzxt",
  tagline: "A two-person studio that designs and builds the whole thing.",
};

export const FOUNDERS = [
  {
    name: "Aastha Gupta",
    role: "Design, brand and client relationships",
    initials: "AG",
    bio: "Graphic designer with agency experience across healthcare, insurance and EdTech. Runs the concept work, the visual system and the conversations with you.",
    links: [
      { label: "Portfolio", href: "https://aasthagupta.framer.website" },
      { label: "Behance", href: "https://behance.net/aasthagupta33" },
    ],
  },
  {
    name: "Shan",
    role: "Build, delivery and infrastructure",
    initials: "SH",
    bio: "Takes the design and makes it real — front-end, integrations, performance, hosting, and everything that has to keep working after handover.",
    links: [{ label: "GitHub", href: "https://github.com/shanzxt" }],
  },
];

/* ---------- Currencies (base: INR) ---------- */
export const CURRENCIES = {
  INR: { symbol: "₹", rate: 1, step: 500, locale: "en-IN" },
  USD: { symbol: "$", rate: 1 / 88, step: 10, locale: "en-US" },
  EUR: { symbol: "€", rate: 1 / 95, step: 10, locale: "de-DE" },
  GBP: { symbol: "£", rate: 1 / 112, step: 10, locale: "en-GB" },
  AED: { symbol: "AED ", rate: 1 / 24, step: 25, locale: "en-AE" },
};

/* ---------- The offer ladder ---------- */
export const OFFERS = [
  {
    id: "teardown",
    name: "Video teardown",
    priceINR: 0,
    priceLabel: "Free",
    duration: "3 minutes, sent in 48h",
    pitch:
      "Send us your site. We record a short screen video showing the three things costing you enquiries, and how we would fix each one.",
    points: [
      "No call, no pitch deck, no signup",
      "Yours to keep and act on, with or without us",
      "Two a week — we record them ourselves",
    ],
    cta: "Request a teardown",
    action: "contact",
  },
  {
    id: "diagnostic",
    name: "Website Performance & Conversion Diagnostic",
    tag: "Low-friction entry · 48-hour turnaround",
    priceINR: 12000,
    duration: "Flat fee · 48h delivery",
    pitch:
      "A deep-dive written audit of your site's load speed, mobile behaviour, technical SEO and conversion friction. Includes a prioritised fix list and a one-page rebuild plan.",
    creditNote: "Fully credited against any Tier 1 or Tier 2 project booked within 30 days.",
    cta: "Book diagnostic",
    action: "modal:diagnostic",
  },
  {
    id: "onepage",
    name: "One-page launch site",
    priceINR: 25000,
    duration: "Live in 7 days",
    pitch:
      "One well-built page that explains what you do and gets people to contact you. The fastest way to stop losing enquiries.",
    points: [
      "Copy shaped with you, not lorem ipsum",
      "Custom design — no template, no page builder",
      "Contact form, analytics, domain and hosting set up",
      "One round of changes after launch",
    ],
    cta: "Start a one-pager",
    action: "contact",
  },
  {
    id: "tier1",
    name: "Brand & Portfolio",
    priceINR: 45000,
    duration: "Public rate · 4–6 bespoke pages",
    launchINR: 27000,
    launchNote: "1 slot open",
    pitch:
      "For founders, creatives, consultants and studios needing a credible, ultra-fast online presence.",
    points: [
      "Visual identity applied end to end",
      "Case-study layouts that hold long-form work",
      "CMS so you can add projects yourself",
      "Handover call and a written guide",
    ],
    cta: "Full deliverables",
    action: "modal:deliverables",
  },
  {
    id: "tier2",
    name: "Business & Growth",
    priceINR: 95000,
    duration: "Public rate · 6–12 tailored pages",
    launchINR: 57000,
    launchNote: "1 slot open",
    pitch:
      "For businesses where the site has a clear commercial job: generate enquiries and capture leads.",
    points: [
      "Service and location pages built for search",
      "Enquiry routing into your CRM or inbox",
      "Conversion tracking and monthly reporting setup",
      "Content structure you can extend",
    ],
    cta: "Full deliverables",
    action: "modal:deliverables",
    highlight: true,
  },
  {
    id: "tier3",
    name: "Product & MVP",
    priceINR: 225000,
    duration: "Custom scoped · full-stack app",
    fixedNote: "Fixed price milestone contract",
    pitch:
      "For startup founders who need a production-ready application shipped quickly with real data and payments.",
    points: [
      "Working software, not a clickable prototype",
      "Auth, database, payments and admin views",
      "Deployment, monitoring and a real handover",
      "Ongoing support retainer if you want it",
    ],
    cta: "Full deliverables",
    action: "modal:deliverables",
  },
];

/* ---------- Selected work ---------- */
export const WORKS = [
  {
    id: "quelessly",
    modal: "quelessly",
    name: "Quelessly",
    kind: "Product build",
    year: "2025—26",
    href: "https://quelessly.com",
    summary:
      "QR ordering for restaurants, live in Pune. Guests scan, order and pay from the table; staff run everything from one screen.",
    stats: [
      { k: "Live in", v: "Pune" },
      { k: "Surface", v: "Guest + staff" },
      { k: "Role", v: "Design and build" },
    ],
  },
  {
    id: "eshani",
    modal: "eshani",
    name: "Eshani Somwanshi",
    kind: "Portfolio site",
    year: "2025",
    href: "https://eshanisomwanshi.com",
    summary:
      "A personal site for a working creative — fast, quiet, and built so the work is the only thing competing for attention.",
    stats: [
      { k: "Pages", v: "Single scroll" },
      { k: "Load", v: "Under 1s" },
      { k: "Role", v: "Design and build" },
    ],
  },
  {
    id: "brand",
    modal: "brand",
    name: "Brand systems",
    kind: "Identity work",
    year: "Ongoing",
    href: null,
    summary:
      "Identity, type and layout systems from Aastha's agency work across healthcare, insurance and EdTech — the groundwork under every site we build.",
    stats: [
      { k: "Sectors", v: "Health, fintech, EdTech" },
      { k: "Output", v: "Identity systems" },
      { k: "Role", v: "Design direction" },
    ],
  },
];

/* ---------- Capabilities marquee ---------- */
export const CAPABILITIES = [
  "High performance",
  "Checkout & payments",
  "Brand identity",
  "Web design",
  "Full-stack development",
  "Design systems",
  "Interactive MVPs",
  "Technical SEO",
  "Accessibility",
  "Hosting & domains",
];

/* ---------- Process ---------- */
export const PROCESS = [
  {
    step: "Discovery",
    days: "Days 1—2",
    body: "We look at what you have, who you are selling to and what has to be true for the site to work. You get our read on it in writing before anyone designs anything.",
    yours: "An hour of your time and access to anything you already have.",
  },
  {
    step: "Concept",
    days: "Days 3—6",
    body: "Aastha puts a direction in front of you — real layouts with your content, not mood boards. We agree on one and stop exploring.",
    yours: "One round of honest feedback.",
  },
  {
    step: "Development",
    days: "Week 2—3",
    body: "The build happens in the open on a staging link you can watch. Every section is responsive and tested as it lands.",
    yours: "Content and approvals as we go.",
  },
  {
    step: "Execution",
    days: "Final week",
    body: "Analytics, forms, search basics, speed passes, cross-browser checks, and the small fixes that separate a demo from a live site.",
    yours: "A final review pass.",
  },
  {
    step: "Handover",
    days: "Launch day",
    body: "You get the repo, the domain, the logins and a written guide. Nothing is locked to us — you can take it anywhere.",
    yours: "Nothing. It is yours.",
  },
];

/* ---------- FAQ ---------- */
export const FAQ = [
  {
    q: "You are two people. What happens if you are busy?",
    a: "We take a fixed number of projects at a time and tell you the start date up front rather than accepting work we cannot begin. If we cannot fit you in this month, we will say so in the first reply.",
  },
  {
    q: "Why is there no long client list?",
    a: "Because we started the studio in 2026 and we would rather show you three things we actually built than twenty logos we touched. Quelessly is live and taking real orders; the portfolio sites are up and you can open them.",
  },
  {
    q: "Do I own the site?",
    a: "Yes, completely. Code, design files, domain and hosting are in your accounts and handed over at launch. There is no platform lock-in and no monthly fee to keep the site online with us.",
  },
  {
    q: "How do payments work?",
    a: "Half to start, half before launch, invoiced with GST from a registered Indian proprietorship. Overseas clients can pay in USD, EUR, GBP or AED by bank transfer or Wise.",
  },
  {
    q: "Can you work with my existing designer or developer?",
    a: "Often, yes. We can take a finished design and build it, or design something for your own team to build. Say which half you need in the brief.",
  },
  {
    q: "What if I only need small changes to what I have?",
    a: "Start with the diagnostic. If the fix list turns out to be a few hours of work, we will quote those hours rather than sell you a rebuild you do not need.",
  },
];

/* ---------- Referral programme ---------- */
export const REFERRAL = {
  cut: "10%",
  points: [
    "Send us someone who becomes a client and you get ten per cent of the project fee.",
    "Paid within a week of the client's final invoice clearing, by transfer or as credit on your own project.",
    "No cap on how many you send. No contract to sign — introduce us by email and we will track it from there.",
    "We will tell you what happened either way, so you are never left wondering.",
  ],
};
