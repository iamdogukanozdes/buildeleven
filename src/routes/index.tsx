import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import logoBlack from "@/assets/build-eleven-logo-black.png.asset.json";
import logoWhite from "@/assets/build-eleven-logo-white.png.asset.json";
import { BookingPopup } from "@/components/booking-popup";
import { ChatWidget } from "@/components/chat-widget";
import { ContactPopup } from "@/components/contact-popup";
import {
  Bot,
  Calendar,
  Code2,
  Cpu,
  Headphones,
  Mail,
  Menu,
  Moon,
  Sun,
  X,
} from "lucide-react";

type Theme = "dark" | "light";

const CONTACT_EMAIL = "info@buildeleven.com";

type Lang = "en" | "nl";

const translations = {
  en: {
    nav: { services: "Services", why: "Why us", book: "Book a call" },
    ctaBook: "Book a free call",
    ctaBookStrategy: "Book a free strategy call",
    ctaExplore: "Explore services",
    heroBadge: "AI implementation + web development",
    heroTitleA: "Build smarter with",
    heroTitleHighlight: "AI-powered",
    heroTitleB: "web solutions",
    heroSub:
      "Build Eleven helps founders and teams launch, automate, and scale. We design and build custom websites, then layer in practical AI that actually saves you time.",
    servicesTitle: "What we can help you build",
    servicesSub:
      "Three ways we work with teams: launch something new, add AI, or keep what you have running smoothly.",
    services: [
      {
        title: "AI Implementation",
        description:
          "We integrate AI into your product or workflow. Think chatbots, automation, and smart features that save you hours every week.",
      },
      {
        title: "Web Building",
        description:
          "Custom websites and web apps built for performance, conversion, and easy maintenance. From landing pages to full-stack products.",
      },
      {
        title: "Ongoing Support",
        description:
          "Reliable support, updates, and optimization so your site keeps working as your business grows.",
      },
    ],
    whyTitle: "Why work with Build Eleven?",
    whySub:
      "We combine technical execution with product thinking, so you get a site or tool that works for your users and your business.",
    reasons: [
      { title: "Product-minded", description: "We focus on outcomes, not just output. Every feature is tied to a business goal." },
      { title: "AI, practically", description: "No hype. We implement AI where it genuinely removes friction or creates value." },
      { title: "Ship fast", description: "Lean sprints, clear communication, and working demos early in the process." },
      { title: "Long-term partner", description: "We stick around for support, iteration, and scaling after launch." },
    ],
    bookTitle: "Let's talk about your project",
    bookSub:
      "Tell us what you're building. We'll get back to you within one business day to set up a free 30-minute call.",
    contactUs: "Contact Us",
    footerRights: "All rights reserved.",
    langLabel: "Language",
    themeToggle: "Toggle theme",
  },
  nl: {
    nav: { services: "Diensten", why: "Waarom wij", book: "Plan een gesprek" },
    ctaBook: "Plan een gratis gesprek",
    ctaBookStrategy: "Plan een gratis strategiegesprek",
    ctaExplore: "Bekijk diensten",
    heroBadge: "AI-implementatie + webontwikkeling",
    heroTitleA: "Bouw slimmer met",
    heroTitleHighlight: "AI-gedreven",
    heroTitleB: "weboplossingen",
    heroSub:
      "Build Eleven helpt oprichters en teams lanceren, automatiseren en schalen. Wij ontwerpen en bouwen maatwerk websites en voegen praktische AI toe die je écht tijd bespaart.",
    servicesTitle: "Waar we je mee kunnen helpen",
    servicesSub:
      "Drie manieren waarop we met teams werken: iets nieuws lanceren, AI toevoegen, of houden wat je hebt soepel draaiende.",
    services: [
      {
        title: "AI-implementatie",
        description:
          "Wij integreren AI in je product of workflow. Dat kan chatbots, automatisering en slimme functies zijn die je wekelijks uren besparen.",
      },
      {
        title: "Webontwikkeling",
        description:
          "Maatwerk websites en webapps gebouwd voor performance, conversie en eenvoudig onderhoud. Van landingspagina's tot full-stack producten.",
      },
      {
        title: "Doorlopende Support",
        description:
          "Betrouwbare ondersteuning, updates en optimalisatie zodat je site blijft werken terwijl je bedrijf groeit.",
      },
    ],
    whyTitle: "Waarom werken met Build Eleven?",
    whySub:
      "Wij combineren technische uitvoering met productdenken, zodat je een site of tool krijgt die werkt voor je gebruikers én je business.",
    reasons: [
      { title: "Productgericht", description: "Wij focussen op resultaten, niet alleen op output. Elke functie is gekoppeld aan een businessdoel." },
      { title: "AI, praktisch", description: "Geen hype. Wij implementeren AI waar het echt frictie wegneemt of waarde creëert." },
      { title: "Snel leveren", description: "Slanke sprints, heldere communicatie en werkende demo's vroeg in het proces." },
      { title: "Lange termijn partner", description: "Wij blijven betrokken voor support, iteratie en schaalvergroting na de lancering." },
    ],
    bookTitle: "Laten we het over je project hebben",
    bookSub:
      "Vertel ons wat je bouwt. We reageren binnen één werkdag om een gratis gesprek van 30 minuten in te plannen.",
    contactUs: "Neem contact op",
    footerRights: "Alle rechten voorbehouden.",
    langLabel: "Taal",
    themeToggle: "Thema wisselen",
  },
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Eleven | AI-Powered Web Solutions" },
      {
        name: "description",
        content:
          "Build Eleven helps founders and teams launch, automate, and scale with custom websites and practical AI integrations. Book a free strategy call.",
      },
      {
        property: "og:title",
        content: "Build Eleven | AI-Powered Web Solutions",
      },
      {
        property: "og:description",
        content:
          "Custom websites and practical AI integrations for growing businesses. Book a free strategy call.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        <Booking t={t} onOpenContact={() => setContactOpen(true)} />
      </main>
      <Footer t={t} />
      <ChatWidget lang={lang} />
      <BookingPopup isOpen={bookingOpen} onClose={() => setBookingOpen(false)} title={t.ctaBook} />
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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          <span className="relative h-9 w-9">
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
        </Link>

        <nav className="hidden items-center gap-1 rounded-xl border border-border/50 bg-background/30 p-1 backdrop-blur-sm md:flex">
          <a
            href="#services"
            className="rounded-lg px-4 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
          >
            {t.nav.services}
          </a>
          <a
            href="#why"
            className="rounded-lg px-4 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
          >
            {t.nav.why}
          </a>
          <a
            href="#book"
            className="rounded-lg px-4 py-1.5 text-sm font-medium text-foreground/80 transition-all duration-200 hover:bg-muted hover:text-foreground active:scale-95"
          >
            {t.nav.book}
          </a>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LangSwitcher lang={lang} setLang={setLang} t={t} />
          <ThemeToggle onToggle={onToggleTheme} t={t} />
          <button
            type="button"
            onClick={onOpenBooking}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            {t.ctaBook}
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <LangSwitcher lang={lang} setLang={setLang} t={t} />
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
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              {t.ctaBook}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero({ t }: { t: T }) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-glow blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-hero-ring/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-surface-foreground shadow-sm">
          <Cpu className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          {t.heroTitleA}{" "}
          <span className="relative inline-block">
            {t.heroTitleHighlight}
            <svg
              className="absolute -bottom-2 left-0 w-full text-accent"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M2 8.5C50 2 250 2 298 8.5" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
            </svg>
          </span>{" "}
          {t.heroTitleB}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          {t.heroSub}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            {t.ctaBookStrategy}
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-7 py-3.5 text-base font-semibold text-surface-foreground transition-colors hover:bg-muted"
          >
            {t.ctaExplore}
          </a>
        </div>
      </div>
    </section>
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
                className={`group relative rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                  highlight ? "border-primary/20 bg-primary/5" : "border-border bg-surface"
                }`}
              >
                <div
                  className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
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

function WhyMe({ t }: { t: T }) {
  return (
    <section id="why" className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.whyTitle}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{t.whySub}</p>
            <a
              href="#book"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
            >
              {t.ctaBook}
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {t.reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
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

function Booking({ t }: { t: T }) {
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
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {t.contactUs}
          </a>
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
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Build Eleven. {t.footerRights}
        </p>
      </div>
    </footer>
  );
}
