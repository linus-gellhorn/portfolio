import { useEffect, useState } from 'react';
import CloudEffect from "./components/CloudEffect";

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Scroll indicator */}
      <div className="fixed top-4 left-4 z-50 bg-black/80 text-white px-4 py-2 rounded-lg font-mono text-sm backdrop-blur-sm">
        <div className="font-semibold">Scroll: {Math.round(scrollY)}px</div>
      </div>

      <CloudEffect />
      <div className="relative min-h-[300vh] font-sans">
        {/* Spacer for scroll */}
        <div className="h-[150vh]"></div>

        {/* DOM content that appears through the O and continues below */}
        <div className="relative z-10 min-h-screen" style={{ backgroundColor: '#5da5d5' }}>
          <div className="flex items-center justify-center min-h-screen">
            <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg">Welcome</h1>
          </div>
        </div>
      </div>
    </>
  );
}
