"use client";

import Node from "@/components/node";
import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import { sections } from "@/data/data";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;

    const handleScroll = () => {
      const scrollPosition = main.scrollTop + main.clientHeight / 2;

      let current = "";
      for (const section of sections) {
        if (section.type !== "section") continue; // Only handle real sections

        const el = document.getElementById(section.id);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            current = section.id;
          }
        }
      }
      setActiveSection(current);
    };

    main.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => main.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    if (!mainRef.current) return;
    animate(mainRef.current.scrollTop, 0, {
      duration: 0.001,
      onUpdate(value) {
        if (mainRef.current) {
          mainRef.current.scrollTop = value;
        }
      },
    });
  };

  const scrollToBottom = () => {
    if (!mainRef.current) return;
    const scrollHeight = mainRef.current.scrollHeight;
    animate(mainRef.current.scrollTop, scrollHeight, {
      duration: 0.001,
      onUpdate(value) {
        if (mainRef.current) {
          mainRef.current.scrollTop = value;
        }
      },
    });
  };

  return (
    <div className="relative flex flex-row max-h-screen max-w-screen overflow-hidden">
      <div className="fixed bottom-6 right-28 flex flex-row gap-2 z-50">
        <button
          onClick={scrollToTop}
          className="bg-black hover:bg-neutral-800 transition duration-200 text-white p-2 hover:cursor-pointer w-48 text-sm"
        >
          Scroll to Top
        </button>
        <button
          onClick={scrollToBottom}
          className="bg-black hover:bg-neutral-800 transition duration-200 text-white p-2 hover:cursor-pointer w-48 text-sm"
        >
          Scroll to Bottom
        </button>
      </div>

      <aside className="w-64 h-screen place-self-center bg-white shadow-lg p-6 rounded-r-xl overflow-y-auto sticky top-0">
        <nav className="flex flex-col gap-4">
          {sections.map((section, idx) => {
            if (section.type === "chapter") {
              return (
                <div
                  key={idx}
                  className="text-xs uppercase tracking-wider text-gray-500 mt-8"
                >
                  {section.title}
                </div>
              );
            }
            if (section.type === "section") {
              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={`hover:underline underline-offset-4 ${
                    activeSection === section.id
                      ? "text-black font-bold"
                      : "text-neutral-700"
                  }`}
                >
                  {section.title}
                </a>
              );
            }
          })}
        </nav>
      </aside>

      <main
        ref={mainRef}
        className="flex flex-col gap-y-12 my-14 flex-1 px-8 overflow-y-auto items-center scroll-smooth"
      >
        {sections.map((section) =>
          section.type === "section" ? (
            <Node
              key={section.id}
              title={section.title}
              id={section.id}
              automatic_load={section.load}
            >
              {() => <section.Scene />}
            </Node>
          ) : null
        )}
      </main>
    </div>
  );
}
