import { useEffect, useState } from "react";
import AboutMe from "./components/AboutMe";
import CloudEffect from "./components/CloudEffect";
import Experience from "./components/Experience";
import Projects from "./components/Projects";

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-4 left-4 z-50 bg-black/80 text-white px-4 py-2 rounded-lg font-mono text-sm backdrop-blur-sm">
        <div className="font-semibold">Scroll: {Math.round(scrollY)}px</div>
      </div>

      {scrollY < 50 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <svg
            className="w-6 h-6 text-white drop-shadow-lg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      )}

      <CloudEffect />
      <div className="relative min-h-[300vh] font-sans">
        <div className="h-[160vh]"></div>
        <AboutMe />
        <Projects />
        <Experience />
      </div>
    </>
  );
}
