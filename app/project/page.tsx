"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

const projects = [
  {
    title: "CIUDAD",
    description:
      "A web application that allows users to explore and discover cities around the world.",
    image: "/projects/ciudad.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
  {
    title: "Portfolio",
    description:
      "A personal portfolio website that showcases my skills and projects.",
    image: "/project/portfolio.png",
    tech: ["Next.js", "Tailwind CSS", "TypeScript", "Vercel"],
  },
];

export default function Project() {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let locked = false;

    const onWheel = (e: WheelEvent) => {
      // let native horizontal gestures (trackpads) through
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

      e.preventDefault();
      if (locked) return;
      locked = true;

      el.scrollBy({
        left: (e.deltaY > 0 ? 1 : -1) * el.clientWidth,
        behavior: "smooth",
      });

      setTimeout(() => {
        locked = false;
      }, 700);
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div className="flex h-svh flex-col gap-4 py-6 md:py-10">
      <header className="flex px-6 md:px-10 gap-x-4 items-center text-foreground/60">
        <a href="/">
          <ArrowLeft />
        </a>
        <h1 className=" text-2xl font-bold uppercase tracking-widest">
          Selected Projects
        </h1>
      </header>

      <main
        ref={containerRef}
        className="flex min-h-0 w-full flex-1 snap-x snap-mandatory overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {projects.map((project, i) => (
          <section
            key={project.title}
            className="h-full w-full shrink-0 grow-0 basis-full snap-start snap-always overflow-y-auto px-6 md:overflow-hidden md:px-10"
          >
            <div className="grid grid-cols-1 gap-4 md:h-full md:min-h-0 md:grid-cols-12 md:grid-rows-6">
              {/* Main image */}
              <div className="relative aspect-video min-h-0 overflow-hidden rounded-xl border border-foreground/10 md:col-span-8 md:row-span-6 md:aspect-auto">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 768px) 66vw, 100vw"
                  className="object-cover"
                />
              </div>

              {/* Title tile */}
              <div className="flex min-h-0 items-end overflow-hidden rounded-xl border border-foreground/10 p-5 md:col-span-4 md:row-span-2">
                <h2 className="font-maven-pro text-4xl font-bold text-foreground md:text-5xl">
                  {project.title}
                </h2>
              </div>

              {/* Description tile */}
              <div className="flex min-h-0 items-center overflow-hidden rounded-xl border border-foreground/10 p-5 md:col-span-4 md:row-span-2">
                <p className="text-sm text-foreground/70">
                  {project.description}
                </p>
              </div>

              {/* Tech tile */}
              <div className="flex min-h-0 flex-wrap content-start gap-2 overflow-hidden rounded-xl border border-foreground/10 p-5 md:col-span-3 md:row-span-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="h-fit rounded-full border border-foreground/20 px-2 py-0.5 text-xs text-foreground/70"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Counter tile */}
              <div className="flex min-h-0 flex-col items-center justify-center overflow-hidden rounded-xl border border-foreground/10 p-3 md:col-span-1 md:row-span-2">
                <span className="text-lg font-bold text-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-xs text-foreground/50">
                  / {String(projects.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
