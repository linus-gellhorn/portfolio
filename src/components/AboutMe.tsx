import { useState } from "react";
import profileSimpsons from "../images/profile-simpsons.png";
import profile from "../images/profile.png";

export default function AboutMe() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative z-10 min-h-[45vh]"
      style={{ backgroundColor: "#5da5d5" }}
    >
      <div className="flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex flex-col items-center gap-2">
              <div
                className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-white shadow-2xl overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setIsHovered(!isHovered)}
              >
                <img
                  src={profile}
                  alt="Linus Gellhorn"
                  className="absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-300 pointer-events-none"
                  style={{
                    objectPosition: "center center",
                    transform: "scale(1.1)",
                    opacity: isHovered ? 0 : 1,
                  }}
                />
                <img
                  src={profileSimpsons}
                  alt="Linus Gellhorn Simpsons"
                  className="absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-300 pointer-events-none"
                  style={{
                    objectPosition: "center 30%",
                    transform: "scale(1)",
                    opacity: isHovered ? 1 : 0,
                  }}
                />
              </div>
              <p className="hidden md:block text-white text-sm opacity-70 italic animate-pulse">
                hover me 👆
              </p>
              <p className="md:hidden text-white text-sm opacity-70 italic animate-pulse">
                tap me 👆
              </p>
            </div>

            <div className="text-white text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Hello, I'm Linus 👋
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                I'm a software developer and have been coding for the last 4
                years.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                My professional experience is in startups, mostly working on B2B
                SaaS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
