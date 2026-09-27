"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";

const navLinks = [
  { label: "Work", to: "#work" },
  { label: "Contact", to: "#contact" },
];

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden bg-background text-foreground">
      {/* Grid background */}
      {/* <div
        className="pointer-events-none absolute inset-0 bg-grid"
        aria-hidden="true"
      /> */}

      {/* Ambient glow orbs */}
      {/* <div
        className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-brand-blue/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[500px] w-[500px] rounded-full bg-brand-red/10 blur-[120px]"
        aria-hidden="true"
      /> */}

      <header className="fixed inset-x-0 top-4 z-50 px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between rounded-2xl border border-border/50 bg-background/70 px-6 py-4 shadow-lg backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-2 text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-brand-red">
              <Zap className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight">Tabs</span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="#contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-blue"
            >
              Hire me
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 h-full">
        {/* Hero */}
        <section className="flex h-full items-center justify-center overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col items-center">
            <h1 className="text-5xl font-extrabold leading-[0.95] tracking-tight text-foreground md:text-7xl lg:text-[8.5rem]">
              <span className="block text-gradient-blue">All is <span className="text-foreground">Well</span></span>
              
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Building software that works. Testing software that lasts
            </p>

            <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:bg-primary/90 glow-blue"
              >
                View selected work
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-secondary px-6 py-3 text-base font-semibold text-secondary-foreground transition-all hover:border-primary/50 hover:bg-secondary/80"
              >
                Start a project
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}