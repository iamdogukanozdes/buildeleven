import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { CalendlyEmbed } from "@/components/calendly-embed";
import logoBlack from "@/assets/build-eleven-logo-black.png.asset.json";
import logoWhite from "@/assets/build-eleven-logo-white.png.asset.json";
import {
  Bot,
  Calendar,
  Code2,
  Cpu,
  Headphones,
  Menu,
  X,
} from "lucide-react";

const CALENDLY_URL = "https://calendly.com/buildeleven/demo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Build Eleven — AI-Powered Web Solutions" },
      {
        name: "description",
        content:
          "Build Eleven helps founders and teams launch, automate, and scale with custom websites and practical AI integrations. Book a free strategy call.",
      },
      {
        property: "og:title",
        content: "Build Eleven — AI-Powered Web Solutions",
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

  return (
    <div className="flex min-h-screen flex-col">
      <Header mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyMe />
        <Booking />
      </main>
      <Footer />
    </div>
  );
}

function Header({
  mobileMenuOpen,
  setMobileMenuOpen,
}: {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-foreground">
          <img
            src={logoBlack.url}
            alt="Build Eleven logo"
            className="h-9 w-9 object-contain"
          />
          Build Eleven
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#services"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Services
          </a>
          <a
            href="#why"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Why me
          </a>
          <a
            href="#book"
            className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Book a call
          </a>
        </nav>

        <div className="hidden md:block">
          <a
            href="#book"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20"
          >
            Book a free call
          </a>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-border/60 bg-background px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            <a
              href="#services"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#why"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Why me
            </a>
            <a
              href="#book"
              className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a call
            </a>
            <a
              href="#book"
              className="mt-2 inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a free call
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-hero-glow blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-hero-ring/50 blur-3xl" />
      </div>

      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-sm font-medium text-surface-foreground shadow-sm">
          <Cpu className="h-4 w-4 text-accent" aria-hidden="true" />
          <span>AI implementation + web development</span>
        </div>

        <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
          Build smarter with{" "}
          <span className="relative inline-block">
            AI-powered
            <svg
              className="absolute -bottom-2 left-0 w-full text-accent"
              viewBox="0 0 300 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M2 8.5C50 2 250 2 298 8.5"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>{" "}
          web solutions
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Build Eleven helps founders and teams launch, automate, and scale. I
          design and build custom websites, then layer in practical AI that
          actually saves you time.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#book"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Book a free strategy call
          </a>
          <a
            href="#services"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-7 py-3.5 text-base font-semibold text-surface-foreground transition-colors hover:bg-muted"
          >
            Explore services
          </a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const services = [
    {
      icon: Bot,
      title: "AI Implementation",
      description:
        "Integrate AI into your product or workflow — from chatbots and automation to intelligent features that save hours every week.",
      highlight: true,
    },
    {
      icon: Code2,
      title: "Web Building",
      description:
        "Custom websites and web apps built for performance, conversion, and easy maintenance. From landing pages to full-stack products.",
      highlight: false,
    },
    {
      icon: Headphones,
      title: "Ongoing Support",
      description:
        "Reliable support, updates, and optimization so your site keeps working as your business grows.",
      highlight: false,
    },
  ];

  return (
    <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            What I can help you build
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-balance text-lg text-muted-foreground">
            Three ways I work with teams: launch something new, add AI, or keep
            what you have running smoothly.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className={`group relative rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:p-8 ${
                service.highlight
                  ? "border-primary/20 bg-primary/5"
                  : "border-border bg-surface"
              }`}
            >
              <div
                className={`mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl ${
                  service.highlight
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyMe() {
  const reasons = [
    {
      title: "Product-minded",
      description:
        "I focus on outcomes, not just output. Every feature is tied to a business goal.",
    },
    {
      title: "AI, practically",
      description:
        "No hype. I implement AI where it genuinely removes friction or creates value.",
    },
    {
      title: "Ship fast",
      description:
        "Lean sprints, clear communication, and working demos early in the process.",
    },
    {
      title: "Long-term partner",
      description:
        "I stick around for support, iteration, and scaling after launch.",
    },
  ];

  return (
    <section id="why" className="bg-surface px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Why work with Build Eleven?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              I combine technical execution with product thinking, so you get a
              site or tool that works for your users and your business.
            </p>
            <a
              href="#book"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20"
            >
              Book a free call
            </a>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div
                key={reason.title}
                className="rounded-2xl border border-border bg-background p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {reason.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Booking() {
  return (
    <section id="book" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Book a 30-minute demo
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-balance text-lg text-muted-foreground">
          Tell me what you&apos;re building. I&apos;ll share how we can get it
          live with the right web foundation and AI where it matters.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl">
        <CalendlyEmbed url={CALENDLY_URL} />
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground">
          <img
            src={logoBlack.url}
            alt="Build Eleven logo"
            className="h-7 w-7 object-contain"
          />
          Build Eleven
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Build Eleven. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
