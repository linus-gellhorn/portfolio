import headshot from "../images/headshot.png";

export default function AboutMe() {
  return (
    <div
      className="relative z-10 min-h-[50vh]"
      style={{ backgroundColor: "#5da5d5" }}
    >
      <div className="flex items-center justify-center px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-shrink-0">
              <img
                src={headshot}
                alt="Linus Gellhorn"
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover shadow-2xl border-4 border-white"
              />
            </div>

            <div className="text-white text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                Welcome to my site 👋
              </h1>
              <p className="text-lg md:text-xl leading-relaxed mb-4">
                Hi, I'm Linus. I'm a software developer and have been coding for
                the last 4 years.
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
