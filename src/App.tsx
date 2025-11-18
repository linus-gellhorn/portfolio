import { useEffect, useState } from "react";
import AboutMe from "./components/AboutMe";
import CloudEffect from "./components/CloudEffect";
import Credits from "./components/Credits";
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
      {scrollY < 50 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <svg
            className="w-8 h-8 text-white drop-shadow-lg"
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
      <div className="font-sans">
        <div className="h-[165vh]"></div>
        <AboutMe />
        <Projects />
        <Experience />
        <Credits />
      </div>
    </>
  );
}
