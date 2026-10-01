"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";


const certificates = [
  {
    title: "",
    issuer: "",
    period: "",
    href: "",
    points: [
      "",
      ""
    ],
    stack: [] as string[],
  },
];

function Node({ small = false }: { small?: boolean }) {
  const outer = small ? "h-3 w-3" : "h-5 w-5";
  const inner = small ? "h-1 w-1" : "h-2 w-2";
  return (
    <span
      className={`${outer} shrink-0 rounded-full border border-foreground/60 flex items-center justify-center bg-background`}
    >
      <span className={`${inner} rounded-full bg-foreground`} />
    </span>
  );
}

export default function Certificate() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ start: true, end: false });

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const go = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  const arrow =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 text-foreground/80 transition-colors hover:border-violet-500 hover:text-violet-500 disabled:pointer-events-none disabled:opacity-30";

  return (
    <div className="flex flex-1 flex-col gap-12 text-left">
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold uppercase tracking-widest">
            CERTIFICATES
          </h1>
          <p className="text-sm text-foreground/60">
            Courses and credentials I&apos;ve earned.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => go(-1)}
            disabled={edge.start}
            className={arrow}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => go(1)}
            disabled={edge.end}
            className={arrow}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        className="flex min-h-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {certificates.map((cert, i) => {
          const isLast = i === certificates.length - 1;

          const card = (
            <div className="group flex h-full flex-col gap-4 rounded-xl border border-foreground/10 p-5 transition-colors hover:border-violet-500/60">
              <div className="flex flex-col">
                <p className="font-maven-pro text-lg font-bold text-foreground">
                  {cert.title}
                </p>
                <p className="text-sm font-medium text-foreground/80">
                  {cert.issuer}
                </p>
                <span className="text-xs text-foreground/60">
                  {cert.period}
                </span>
              </div>

              <ul className="flex flex-col gap-2">
                {cert.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2 text-sm text-foreground/70"
                  >
                    <span className="mt-1">
                      <Node small />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>

              {/* Pinned to the bottom of the column */}
              <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                <div className="flex flex-wrap gap-2">
                  {cert.stack.map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                </div>
                {cert.href && (
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-violet-500" />
                )}
              </div>
            </div>
          );

          return (
            <div
              key={i}
              className="flex shrink-0 basis-[85%] snap-start flex-col gap-4 sm:basis-1/2 lg:basis-1/3"
            >
              {/* Timeline: ring node + line running across the row */}
              <div className="flex items-center">
                <Node />
                <span
                  className={`h-px flex-1 ${
                    isLast
                      ? "bg-gradient-to-r from-foreground/30 to-transparent"
                      : "bg-foreground/30"
                  }`}
                />
              </div>

              <div className="mr-4 flex-1">
                {cert.href ? (
                  <a
                    href={cert.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    {card}
                  </a>
                ) : (
                  card
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}