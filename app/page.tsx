"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Experience from "./experience";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/chanixx786",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/christian-tabanao-952546301/",
    icon: FaLinkedin,
  },
  {
    label: "Email",
    href: "mailto:christabanao331@gmail.com",
    icon: Mail,
  },
];

// Moodboard images
const moodboard = [
  {
    src: "/moodboard/code.jpg",
    alt: "Coding",
    className: "col-span-2 row-span-2",
  },
  {
    src: "/moodboard/design.jpg",
    alt: "Design",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/moodboard/coffee.jpg",
    alt: "Coffee",
    className: "col-span-1 row-span-1",
  },
  {
    src: "/moodboard/music.jpg",
    alt: "Music",
    className: "col-span-1 row-span-2",
  },
  {
    src: "/moodboard/setup.jpg",
    alt: "Workspace",
    className: "col-span-1 row-span-1",
  },

];

export default function Home() {
  return (
    <div className="relative min-h-svh text-foreground">
      <header>
        <div className="absolute inset-x-0 top-0 z-10 flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <img src="/logo.svg" alt="Logo" width={40} height={40} />
            <span className="font-bold">TABS</span>
          </Link>
        </div>
      </header>

      <main className="relative z-10">
        <section className="flex min-h-svh items-center justify-center overflow-hidden px-6 py-24">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center md:flex-row md:items-center md:justify-center md:gap-16">
            
            {/* Left */}
            <div className="flex w-full max-w-xl flex-col gap-12 md:text-left">
              <div>
                <p className="text-sm text-foreground/60 md:text-base">
                  Hi, I&apos;m
                </p>

                <h1 className="mt-2 text-balance text-4xl font-bold tracking-tight font-maven-pro text-foreground sm:text-5xl lg:text-6xl">
                  <span className="text-foreground/60">Christian</span>{" "}
                  Tabanao
                </h1>
              </div>

              <div className="flex flex-col items-center gap-12 md:items-start">
                <p className="max-w-2xl text-pretty text-base leading-relaxed text-foreground/60 md:text-sm">
                  I enjoy exploring new ideas, building meaningful projects,
                  and finding practical solutions to problems. I&apos;m always
                  looking for opportunities to learn, grow, and turn ideas into
                  something useful.
                </p>

                <div className="flex flex-col items-center gap-3 md:items-start">
                  <p className="text-sm text-foreground/60">
                    Find me online
                  </p>

                  <ul className="flex items-center gap-3">
                    {socials.map(({ label, href, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target={
                            href.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            href.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                          aria-label={label}
                          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background/60 text-foreground/80 backdrop-blur transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Moodboard [Projects] */}
            <div className="w-full max-w-sm">
              <div className="grid auto-rows-[100px] grid-cols-3 gap-2">
                {moodboard.map((item) => (
                  <div
                    key={item.src}
                    className={`group relative overflow-hidden rounded-xl border border-border bg-muted ${item.className}`}
                  >
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="absolute bottom-2 left-2 text-xs font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      {item.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="flex min-h-svh items-start justify-center overflow-hidden px-6 py-24">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center md:flex-row md:items-center md:justify-center md:gap-16">
            <Experience />
          </div>
        </section>
      </main>
    </div>
  );
}