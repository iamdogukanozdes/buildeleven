import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import type { LucideIcon } from "lucide-react";

import logoBlack from "@/assets/build-eleven-11-dark.png.asset.json";
import logoWhite from "@/assets/build-eleven-11-light.png.asset.json";
import { BookingPopup } from "@/components/booking-popup";
import { ChatWidget } from "@/components/chat-widget";
import { ContactPopup } from "@/components/contact-popup";
import { CursorFx } from "@/components/cursor-fx";
import {
  Bot,
  Calendar,
  Code2,
  Cpu,
  Headphones,
  Mail,
  Menu,
  Moon,
  Quote,
  Star,
  Sun,
  X,
} from "lucide-react";

type Theme = "dark" | "light";

const CONTACT_EMAIL = "info@buildeleven.com";

type Lang = "en" | "nl";

const translations = {
  en: {
    nav: { services: "Services", why: "Why us", book: "Book a call" },
    ctaBook: "Book a call",
    ctaBookStrategy: "Book a free strategy call",
    ctaExplore: "Explore services",
    heroBadge: "For small businesses & busy founders",
    heroTitleA: "A website and",
    heroTitleHighlight: "AI solutions",
    heroTitleB: "for your business",
    heroSub:
      "No website yet? Too busy to build one? Outdated and losing customers? We build it for you. Modern, fast, and ready to bring in real business. AI included where it saves you real hours.",
    stats: [
      { value: "9+", label: "Years of experience" },
      { value: "32+", label: "Projects completed" },
      { value: "98%", label: "Satisfied clients" },
      { value: "10+", label: "Industries served" },
    ],

    servicesTitle: "What we do for you",
    servicesSub:
      "Everything you need to get online, look sharp, and let AI handle the busywork. You focus on customers, we handle the tech.",
    services: [
      {
        title: "Websites for New Businesses",
        description:
          "Starting out and need a website that actually gets you customers? We design and build it end to end. You show up, we ship.",
      },
      {
        title: "AI That Saves You Time",
        description:
          "Chatbots, automations, and smart tools that handle repetitive work. Answer clients faster, capture more leads, spend less time in your inbox.",
      },
      {
        title: "Updates & Ongoing Support",
        description:
          "Got an old website that no longer reflects your business? We refresh it and keep it running smoothly so you never have to think about it.",
      },
    ],
    whyTitle: "Why business owners pick us",
    whySub:
      "You want a professional online presence without becoming a developer. We make that easy, fast, and stress free."
    reasons: [
      { title: "You stay focused", description: "We handle the tech from start to finish. You keep running your business." },
      { title: "Built to bring in clients", description: "Every page is designed to turn visitors into real leads and bookings." },
      { title: "Live in weeks, not months", description: "Most sites go live within two to four weeks. No endless back and forth." },
      { title: "We stick around", description: "Need a change or an update? Send a message. We handle it." },
    ],
    bookTitle: "Let's talk about your business",
    testimonialsTitle: "Trusted by small businesses",
    testimonialsSub:
      "Owners who didn't have the time or the tech skills to build it themselves. Now they have a site that works for them.",
    testimonials: [
      {
        quote:
          "We had no website and no time to build one. Build Eleven took over completely and delivered something we're proud to share. New client bookings started coming in the first week.",
        name: "Sanne de Vries",
        role: "Owner, Northlane Studio",
      },
      {
        quote:
          "Our old site was five years out of date and embarrassing. They rebuilt it and added an AI assistant that answers customer questions day and night. Huge relief.",
        name: "Marcus Klein",
        role: "Founder, Payloop",
      },
      {
        quote:
          "We're a small team and can't afford to babysit a website. Build Eleven set everything up, keeps it running, and we finally look as professional online as we are in person.",
        name: "Amira Hassan",
        role: "Owner, Trailkit",
      },
    ],
    resultsTitle: "What our clients get",
    results: [
      { value: "2-4 wks", label: "From first call to live site" },
      { value: "40%", label: "More inbound leads on average" },
      { value: "8h", label: "Saved per week with AI" },
      { value: "0", label: "Tech skills required from you" },
    ],

    
    bookSub:
      "Tell us about your business. We'll get back within one business day to set up a free 30-minute call. No pressure, no jargon.",

    contactUs: "Contact Us",
    bookingPopupReady: "Ready to chat?",
    bookingPopupText:
      "Pick a time that works for you through Calendly. It opens in a new tab so you can book without leaving the site.",
    bookingPopupOpen: "Open Calendly",
    bookingPopupPowered: "Powered by Calendly",
    footerRights: "All rights reserved.",
    langLabel: "Language",
    themeToggle: "Toggle theme",
  },
  nl: {
    nav: { services: "Diensten", why: "Waarom wij", book: "Plan een gesprek" },
    ctaBook: "Plan een gesprek",
    ctaBookStrategy: "Plan een gratis strategiegesprek",
    ctaExplore: "Bekijk diensten",
    heroBadge: "Voor kleine bedrijven & drukke ondernemers",
    heroTitleA: "Een website en",
    heroTitleHighlight: "AI-oplossingen",
    heroTitleB: "voor jouw bedrijf",
    heroSub:
      "Nog geen website? Geen tijd om er zelf een te bouwen? Verouderd en verlies je klanten? Wij bouwen het voor je. Modern, snel en klaar om echt klanten binnen te halen. AI erbij waar het je uren scheelt.",
    stats: [
      { value: "9+", label: "Jaar ervaring" },
      { value: "32+", label: "Projecten afgerond" },
      { value: "98%", label: "Tevreden klanten" },
      { value: "10+", label: "Industrieën bediend" },
    ],

    servicesTitle: "Wat wij voor je doen",
    servicesSub:
      "Alles wat je nodig hebt om online te staan, er scherp uit te zien en AI het routinewerk te laten doen. Jij focust op klanten, wij op de techniek.",
    services: [
      {
        title: "Websites voor Nieuwe Bedrijven",
        description:
          "Net begonnen en een website nodig die écht klanten oplevert? Wij ontwerpen en bouwen het van A tot Z. Jij komt opdagen, wij leveren.",
      },
      {
        title: "AI die je Tijd Bespaart",
        description:
          "Chatbots, automatiseringen en slimme tools die het herhaalwerk doen. Sneller reageren op klanten, meer leads binnenhalen, minder tijd in je inbox.",
      },
      {
        title: "Updates & Doorlopende Support",
        description:
          "Een oude website die je bedrijf niet meer weerspiegelt? Wij frissen hem op en houden hem draaiend, zodat jij er niet meer aan hoeft te denken.",
      },
    ],
    whyTitle: "Waarom ondernemers voor ons kiezen",
    whySub:
      "Jij wilt een professionele online uitstraling zonder zelf ontwikkelaar te worden. Wij maken dat makkelijk, snel en zonder stress.",
    reasons: [
      { title: "Jij blijft gefocust", description: "Wij regelen de techniek van begin tot eind. Jij runt je bedrijf." },
      { title: "Gebouwd om klanten binnen te halen", description: "Elke pagina is ontworpen om bezoekers om te zetten in echte leads en boekingen." },
      { title: "Live in weken, niet maanden", description: "De meeste sites staan binnen twee tot vier weken live. Geen eindeloos heen en weer." },
      { title: "Wij blijven betrokken", description: "Iets aanpassen of updaten? Stuur een berichtje. Wij regelen het." },
    ],
    testimonialsTitle: "Vertrouwd door kleine bedrijven",
    testimonialsSub:
      "Ondernemers die de tijd of de tech-skills niet hadden om het zelf te bouwen. Nu hebben ze een site die voor hen werkt.",
    testimonials: [
      {
        quote:
          "We hadden geen website en geen tijd om er een te bouwen. Build Eleven nam het volledig over en leverde iets waar we trots op zijn. De eerste week kwamen er al nieuwe boekingen binnen.",
        name: "Sanne de Vries",
        role: "Eigenaar, Northlane Studio",
      },
      {
        quote:
          "Onze oude site was vijf jaar verouderd en gênant. Ze hebben hem opnieuw gebouwd en een AI-assistent toegevoegd die dag en nacht klantvragen beantwoordt. Enorme opluchting.",
        name: "Marcus Klein",
        role: "Oprichter, Payloop",
      },
      {
        quote:
          "We zijn een klein team en kunnen geen website babysitten. Build Eleven heeft alles opgezet, houdt het draaiend, en we zien er online eindelijk net zo professioneel uit als in het echt.",
        name: "Amira Hassan",
        role: "Eigenaar, Trailkit",
      },
    ],
    resultsTitle: "Wat onze klanten krijgen",
    results: [
      { value: "2-4 wkn", label: "Van eerste gesprek tot live site" },
      { value: "40%", label: "Meer inbound leads gemiddeld" },
      { value: "8u", label: "Bespaard per week met AI" },
      { value: "0", label: "Tech-kennis nodig van jou" },
    ],
    bookTitle: "Laten we het over jouw bedrijf hebben",
    bookSub:
      "Vertel ons over je bedrijf. We reageren binnen één werkdag om een gratis gesprek van 30 minuten in te plannen. Geen druk, geen jargon.",

    contactUs: "Neem contact op",
    bookingPopupReady: "Klaar om te sparren?",
    bookingPopupText:
      "Kies een tijd die jou uitkomt via Calendly. Het opent in een nieuw tabblad zodat je kunt boeken zonder de site te verlaten.",
    bookingPopupOpen: "Open Calendly",
    bookingPopupPowered: "Mogelijk gemaakt door Calendly",
    footerRights: "Alle rechten voorbehouden.",
    langLabel: "Taal",
    themeToggle: "Thema wisselen",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Eleven | Websites & AI" },
      {
        name: "description",
        content:
          "No website, no time, or an outdated one? Build Eleven builds modern websites and AI solutions for all kinds of businesses and busy founders. Book a free call.",
      },
      {
        property: "og:title",
        content: "Build Eleven | Websites & AI",
      },
      {
        property: "og:description",
        content:
          "No website, no time, or an outdated one? Build Eleven builds modern websites and AI solutions for all kinds of businesses and busy founders. Book a free call.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://buildeleven.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://buildeleven.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              name: "Website design and development",
              serviceType: "Web development",
              description:
                "Modern, fast websites built for businesses that have no site, an outdated one, or no time to build their own.",
              provider: { "@type": "Organization", name: "Build Eleven", url: "https://buildeleven.lovable.app/" },
              areaServed: "Worldwide",
            },
            {
              "@type": "Service",
              name: "AI solutions and automation",
              serviceType: "AI implementation",
              description:
                "Custom AI assistants, automations and integrations that save business owners time and handle customer questions.",
              provider: { "@type": "Organization", name: "Build Eleven", url: "https://buildeleven.lovable.app/" },
              areaServed: "Worldwide",
            },
          ],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lang, setLang] = useState<Lang>("en");
  const [theme, setTheme] = useState<Theme>("dark");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  useEffect(() => {
    const storedLang = typeof window !== "undefined" ? (localStorage.getItem("lang") as Lang | null) : null;
    if (storedLang === "en" || storedLang === "nl") setLang(storedLang);

    const storedTheme = typeof window !== "undefined" ? (localStorage.getItem("theme") as Theme | null) : null;
    const isDark = storedTheme !== "light";
    setTheme(isDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
    }
  };

  const t = translations[lang];

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        t={t}
        lang={lang}
        setLang={setLang}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        onToggleTheme={toggleTheme}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenContact={() => setContactOpen(true)}
      />
      <main className="flex-1">
        <Hero t={t} onOpenBooking={() => setBookingOpen(true)} onOpenContact={() => setContactOpen(true)} />
        <Services t={t} />
        <WhyMe t={t} onOpenBooking={() => setBookingOpen(true)} />
        <Testimonials t={t} />
        <Booking t={t} onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer t={t} />
      <ChatWidget lang={lang} />
      <CursorFx />
      <BookingPopup
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        title={t.ctaBook}
        ready={t.bookingPopupReady}
        text={t.bookingPopupText}
        openLabel={t.bookingPopupOpen}
        powered={t.bookingPopupPowered}
      />
      <ContactPopup isOpen={contactOpen} onClose={() => setContactOpen(false)} title={t.contactUs} lang={lang} />
    </div>
  );
}

type T = typeof translations.en;

function LangSwitcher({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: T }) {
  return (
    <div
      role="group"
      aria-label={t.langLabel}
      className="inline-flex items-center rounded-full border border-border bg-surface p-0.5 text-xs font-semibold"
    >
      {(["en", "nl"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === code
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={lang === code}
        >
          {code}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle({ onToggle, t }: { onToggle: () => void; t: T }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={t.themeToggle}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-muted"
    >
      <Sun className="h-4 w-4 block dark:hidden" aria-hidden="true" />
      <Moon className="h-4 w-4 hidden dark:block" aria-hidden="true" />
    </button>
  );
}

function Header({
  t,
  lang,
  setLang,
  mobileMenuOpen,
  setMobileMenuOpen,
  onToggleTheme,
  onOpenBooking,
  onOpenContact,
}: {
  t: T;
  lang: Lang;
  setLang: (l: Lang) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  onToggleTheme: () => void;
  onOpenBooking: () => void;
  onOpenContact: () => void;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Left: mark + wordmark */}
        <Link to="/" className="flex items-center gap-2.5" aria-label="Build Eleven home">
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border/70 bg-surface/60">
            <span className="relative h-5 w-5">
              <img src={logoBlack.url} alt="" className="absolute inset-0 h-full w-full object-contain block dark:hidden" />
              <img src={logoWhite.url} alt="" className="absolute inset-0 h-full w-full object-contain hidden dark:block" />
            </span>
          </span>
          <span className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
            BUILD<span className="text-primary">11</span>
          </span>
        </Link>

        {/* Right: nav + actions */}
        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-1 md:flex">
            <a href="#services" className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.services}
            </a>
            <a href="#why" className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.why}
            </a>
            <a href="#book" className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t.nav.book}
            </a>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <LangSwitcher lang={lang} setLang={setLang} t={t} />
            <ThemeToggle onToggle={onToggleTheme} t={t} />
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:shadow-primary/30"
            >
              {t.ctaBook}
            </button>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle onToggle={onToggleTheme} t={t} />
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>


      {mobileMenuOpen && (
        <div className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a href="#services" className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.services}
            </a>
            <a href="#why" className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.why}
            </a>
            <a href="#book" className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground" onClick={() => setMobileMenuOpen(false)}>
              {t.nav.book}
            </a>
            <div className="pt-2"><LangSwitcher lang={lang} setLang={setLang} t={t} /></div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background"
            >
              {t.ctaBook}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ t, onOpenBooking, onOpenContact }: { t: T; onOpenBooking: () => void; onOpenContact: () => void }) {
  const platformIcons = [Bot, Code2, Cpu, Headphones, Calendar];
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-hero-glow blur-3xl animate-float-slow" />
        <div className="absolute bottom-0 right-0 h-[520px] w-[520px] translate-x-1/4 translate-y-1/4 rounded-full bg-hero-ring/50 blur-3xl animate-float-slow-alt" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Left: copy */}
        <div className="text-left">
          <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>{t.heroBadge}</span>
          </div>

          <h1
            className="reveal font-display text-balance font-bold leading-[1.02] tracking-tight text-foreground text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem]"
            style={{ ["--reveal-delay" as string]: "80ms" }}
          >
            {t.heroTitleA}{" "}
            <span className="text-primary">{t.heroTitleHighlight}</span>{" "}
            {t.heroTitleB}
          </h1>

          <p
            className="reveal mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ ["--reveal-delay" as string]: "160ms" }}
          >
            {t.heroSub}
          </p>

          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={onOpenBooking}
              className="group inline-flex items-center justify-between gap-3 rounded-full bg-primary py-2 pl-2 pr-6 text-base font-semibold text-primary-foreground shadow-xl shadow-primary/20 transition-all hover:shadow-primary/40"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur-sm">
                <Calendar className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="flex-1 text-center sm:flex-none">{t.ctaBookStrategy}</span>
            </button>
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex items-center justify-center rounded-full border border-border bg-surface/40 px-6 py-4 text-base font-semibold text-foreground transition-colors hover:bg-muted"
            >
              {t.contactUs}
            </button>
          </div>
        </div>

        {/* Right: orbit visual */}
        <OrbitVisual icons={platformIcons} onOpenBooking={onOpenBooking} />

      </div>

      {/* Stats row */}
      <div className="mx-auto mt-16 grid max-w-7xl grid-cols-2 gap-4 sm:mt-20 md:grid-cols-4">
        {t.stats.map((s, i) => (
          <div
            key={s.label}
            className="reveal rounded-2xl border border-border bg-surface/50 p-5 backdrop-blur-sm"
            style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
          >
            <div className="font-display text-3xl font-bold text-primary sm:text-4xl">{s.value}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

const ORBIT_LABELS = ["AI", "Web", "Automation", "Support", "Booking"];

function OrbitVisual({ icons, onOpenBooking }: { icons: LucideIcon[]; onOpenBooking: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = now - last;
      last = now;
      setRotation((r) => (r + dt * 0.006) % 360);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  const onMove = (e: React.MouseEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ x: py * -14, y: px * 14 });
  };

  return (
    <div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={() => {
        setTilt({ x: 0, y: 0 });
        setPaused(false);
        setActive(null);
      }}
      className="reveal relative mx-auto aspect-square w-full max-w-md lg:max-w-lg"
      style={{ ["--reveal-delay" as string]: "220ms", perspective: "1000px" }}
    >
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`, transformStyle: "preserve-3d" }}
      >
        <div className="absolute inset-0 rounded-full border border-primary/15" />
        <div className="absolute inset-[12%] rounded-full border border-primary/20" />
        <div className="absolute inset-[24%] rounded-full border border-primary/25" />
        <div className="absolute inset-[36%] rounded-full border border-primary/30" />

        <div className="absolute left-1/2 top-1/2 flex h-44 w-44 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-primary/10 shadow-2xl shadow-primary/30 backdrop-blur-sm transition-transform duration-300 sm:h-52 sm:w-52 lg:h-60 lg:w-60">
          <div className="flex h-full w-full flex-col items-center justify-center gap-2">
            <span className="relative h-20 w-20 sm:h-24 sm:w-24 lg:h-28 lg:w-28">
              <img src={logoBlack.url} alt="" className="absolute inset-0 h-full w-full object-contain block dark:hidden" />
              <img src={logoWhite.url} alt="" className="absolute inset-0 h-full w-full object-contain hidden dark:block" />
            </span>
            <span className="h-4 text-xs font-medium uppercase tracking-widest text-primary">
              {active !== null ? ORBIT_LABELS[active] : ""}
            </span>
          </div>
        </div>

        {icons.map((Icon, i) => {
          const angle = ((i / icons.length) * 360 + rotation - 90) * (Math.PI / 180);
          const radius = 44;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          const isActive = active === i;
          return (
            <button
              key={i}
              type="button"
              aria-label={ORBIT_LABELS[i]}
              onMouseEnter={() => {
                setPaused(true);
                setActive(i);
              }}
              onFocus={() => {
                setPaused(true);
                setActive(i);
              }}
              onClick={onOpenBooking}
              className={`absolute flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border bg-surface/80 shadow-lg backdrop-blur-sm outline-none transition-[transform,background-color,border-color,box-shadow] duration-200 sm:h-16 sm:w-16 ${
                isActive
                  ? "scale-125 border-primary/60 bg-primary text-primary-foreground shadow-primary/40"
                  : "border-border text-foreground hover:scale-110"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <Icon className="h-6 w-6 sm:h-7 sm:w-7" aria-hidden="true" />
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Services({ t }: { t: T }) {

  const icons = [Bot, Code2, Headphones];
  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.servicesTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            {t.servicesSub}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.services.map((service, i) => {
            const Icon = icons[i];
            const highlight = i === 0;
            return (
              <div
                key={service.title}
                className={`reveal spotlight group relative rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 sm:p-8 ${
                  highlight ? "border-primary/20 bg-primary/5" : "border-border bg-surface"
                }`}
                style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 ${
                    highlight ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{service.title}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyMe({ t, onOpenBooking }: { t: T; onOpenBooking: () => void }) {
  return (
    <section id="why" className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.whyTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.whySub}</p>
            <button
              type="button"
              onClick={onOpenBooking}
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
            >
              {t.ctaBook}
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {t.reasons.map((reason, i) => (
              <div
                key={reason.title}
                className="reveal spotlight rounded-2xl border border-border bg-background p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <h3 className="text-lg font-semibold text-foreground">{reason.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ t }: { t: T }) {
  return (
    <section id="testimonials" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.testimonialsTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            {t.testimonialsSub}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {t.testimonials.map((item, i) => (
            <figure
              key={item.name}
              className="reveal spotlight relative flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 sm:p-7"
              style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}
            >
              <Quote className="mb-4 h-7 w-7 text-primary/70" aria-hidden="true" />
              <div className="mb-4 flex gap-0.5 text-primary">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="flex-1 text-base leading-relaxed text-foreground/90">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-border/60 pt-4">
                <div className="text-sm font-semibold text-foreground">{item.name}</div>
                <div className="text-sm text-muted-foreground">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="text-center text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            {t.resultsTitle}
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {t.results.map((r, i) => (
              <div
                key={r.label}
                className="reveal rounded-2xl border border-border bg-surface/60 p-5 text-center backdrop-blur-sm"
                style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}
              >
                <div className="font-display text-3xl font-bold text-primary sm:text-4xl">{r.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking({ t, onOpenContact }: { t: T; onOpenContact: () => void }) {
  return (
    <section id="book" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {t.bookTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted-foreground">
          {t.bookSub}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onOpenContact}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t.contactUs}
          </button>
        </div>
      </div>
    </section>
  );
}

function Footer({ t }: { t: T }) {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
          <span className="relative h-7 w-7">
            <img
              src={logoBlack.url}
              alt="Build Eleven logo"
              className="absolute inset-0 h-full w-full object-contain block dark:hidden"
            />
            <img
              src={logoWhite.url}
              alt="Build Eleven logo"
              className="absolute inset-0 h-full w-full object-contain hidden dark:block"
            />
          </span>
          Build Eleven
        </div>
        <p className="text-sm text-muted-foreground text-center sm:text-right">
          © {new Date().getFullYear()} Build Eleven by Dogukan Ozdes · USA & Netherlands
          <br />
          <span className="text-xs">{t.footerRights}</span>
        </p>

      </div>
    </footer>
  );
}
