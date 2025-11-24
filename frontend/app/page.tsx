"use client";

import { useState, useEffect } from "react";

const sections = ["Home", "About", "Portfolio", "Contact"];

const Navbar = ({ activeSection, setActiveSection }: any) => {
  return (
    <nav className="w-full flex justify-center items-center h-24 gap-x-6 fixed top-0 bg-white shadow z-10">
      {sections.map((section) => (
        <button
          key={section}
          onClick={() => {
            const el = document.getElementById(section);
            el?.scrollIntoView({ behavior: "smooth" });
          }}
          className={`px-6 py-2 rounded-lg border-0 font-semibold
            ${
              activeSection === section
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
        >
          {section}
        </button>
      ))}
    </nav>
  );
};

export default function Home() {
  const [activeSection, setActiveSection] = useState("Home");

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      sections.forEach((section) => {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const bottom = top + el.offsetHeight;
          if (scrollPos >= top && scrollPos < bottom) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="w-screen h-screen scroll-smooth">
      <Navbar activeSection={activeSection} setActiveSection={setActiveSection} />

      <section
        id="Home"
        className="h-screen flex justify-center items-center bg-gray-100"
      >
        <h1 className="text-4xl font-bold">Home Section</h1>
      </section>

      <section
        id="About"
        className="h-screen flex justify-center items-center bg-gray-200"
      >
        <h1 className="text-4xl font-bold">About Section</h1>
      </section>

      <section
        id="Portfolio"
        className="h-screen flex justify-center items-center bg-gray-300"
      >
        <h1 className="text-4xl font-bold">Portfolio Section</h1>
      </section>

      <section
        id="Contact"
        className="h-screen flex justify-center items-center bg-gray-400"
      >
        <h1 className="text-4xl font-bold">Contact Section</h1>
      </section>
      <footer>
        Hello World
      </footer>
    </div>
  );
}
