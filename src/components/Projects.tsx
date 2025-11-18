import recordoImage from "../images/recordo.png";
import signlearnerImage from "../images/signlearner.png";

const projects: {
  title: string;
  description: string;
  image: string;
  link: string;
}[] = [
  {
    title: "Sign Learner",
    description:
      "A Google Chrome extension that helps you learn sign language while browsing the internet.",
    image: signlearnerImage,
    link: "https://signlearner.com",
  },
  {
    title: "Recordo",
    description:
      "A native Mac app built with SwiftUI that allows you to create beautiful screen recordings.",
    image: recordoImage,
    link: "https://recordo.io",
  },
];

export default function Projects() {
  return (
    <div
      className="relative z-10 min-h-screen"
      style={{ backgroundColor: "#5da5d5" }}
    >
      <div className="flex items-center justify-center px-6 py-20">
        <div className="max-w-6xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white drop-shadow-lg">
            Side Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-300 flex flex-col h-full"
              >
                <div className="flex-grow">
                  <h3 className="text-3xl font-bold mb-4 text-gray-900">
                    {project.title}
                  </h3>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
                <div className="mt-auto">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full aspect-video mb-6 rounded-lg overflow-hidden border-2 border-gray-200 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </a>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors group"
                  >
                    View website
                    <svg
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
