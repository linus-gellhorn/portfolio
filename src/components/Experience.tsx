import vitatekLogo from "../images/vitatek.png";

const experience: {
  title: string;
  company: string;
  date: string;
  link: string;
  logo: React.ReactNode | null;
}[] = [
  {
    company: "Pinpoint",
    title: "Senior Software Engineer",
    date: "July 2024 - Present",
    link: "https://www.pinpointhq.com",
    logo: (
      <svg
        width="53"
        height="53"
        viewBox="0 0 53 53"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fillRule="nonzero" fill="none">
          <path fill="#ED9D85" d="M.36 26.7V.47h26.22z"></path>
          <path fill="#F1564E" d="M.36 52.92V26.7h26.22z"></path>
          <path
            d="M26.58.47h13.11a13.11 13.11 0 0113.12 13.11A13.11 13.11 0 0139.69 26.7H26.58V.47z"
            fill="#FCB643"
          ></path>
        </g>
      </svg>
    ),
  },
  {
    company: "Cegid (Formerly StorIQ)",
    title: "Software Engineer",
    date: "March 2022 - June 2024",
    link: "https://www.cegid.com",
    logo: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        id="Calque_1"
        x="0px"
        y="0px"
        width="100px"
        height="40px"
        viewBox="0 0 100 40"
        xmlSpace="preserve"
      >
        <g>
          <g>
            <path
              fill="#0046FE"
              d="M53,24.8c-3.1,0-5.3-2.5-5.3-5.8c0-3.3,2.2-5.8,5.3-5.8c3.1,0,5.3,2.4,5.3,5.8C58.3,22.3,56,24.8,53,24.8     M58.3,8.7v2.2h-0.8l-0.1-0.1c-1.2-1.3-2.7-2.6-5.8-2.6c-5.2,0-9.3,4.7-9.3,10.8c0,6.1,4.2,10.8,9.6,10.8c3.1,0,4.6-1.3,5.5-2.4    l0.1-0.1h0.8v4.2c0,1.9-1.5,3.4-3.4,3.4h-7V40h7.7c4.4,0,8-3.6,8-8V8.7H58.3z"
            />
            <path
              fill="#0046FE"
              d="M29.2,30.2c-6.2,0-10.7-4.5-10.7-10.8c0-6.2,4.5-10.8,10.5-10.8c6,0,10.3,4.4,10.3,10.8v1.2H24l0,0.3    c0,2.8,2.1,4.7,5.1,4.7c2.2,0,3.9-0.9,4.7-2.5l4.7,1.1C37.2,28,33.8,30.2,29.2,30.2 M29.1,12.9c-2.9,0-4.7,2-5,4l0,0.3h10l0-0.3    C33.7,14.6,31.6,12.9,29.1,12.9"
            />
            <path
              fill="#0046FE"
              d="M68.1,9.6h5.3v20h-5.3V9.6z M70.8,6.2c-1.8,0-3.2-1.3-3.2-3.1C67.6,1.3,69,0,70.8,0C72.6,0,74,1.4,74,3.1    C74,4.9,72.6,6.2,70.8,6.2"
            />
            <path
              fill="#0046FE"
              d="M86.4,30.3c-5.4,0-9.6-4.8-9.6-10.8c0-6,4.1-10.8,9.3-10.8c2.5,0,4.4,0.9,5.8,2.6l0.1,0.1h0.8V0.3h5.3v29.5    h-5.3v-2h-0.9l-0.1,0.1C90.7,29.5,88.8,30.3,86.4,30.3 M87.5,13.7c-3.1,0-5.3,2.4-5.3,5.8c0,3.4,2.3,5.8,5.4,5.8    c3,0,5.3-2.5,5.3-5.8C92.9,16.1,90.7,13.7,87.5,13.7"
            />
            <path
              fill="#0046FE"
              d="M10.4,30.1C4.4,30.1,0,25.7,0,19.5C0,13.2,4.6,8.7,10.9,8.7c2.2,0,3.8,0.4,6.1,1.4l-1.7,4.3    c-1.5-0.6-2.5-0.9-3.8-0.9c-2.9,0-5.1,2.1-5.1,5.4c0,3.3,2.2,5.4,5.1,5.4c1.3,0,2.3-0.3,3.8-0.9l1.7,4.3    C12.2,30.5,11.1,30.1,10.4,30.1z"
            />
          </g>
        </g>
      </svg>
    ),
  },
  {
    company: "VitaTek",
    title: "Freelance Software Engineer",
    date: "Jan 2023 - June 2023",
    link: "https://www.vitatek.io",
    logo: <img src={vitatekLogo} alt="VitaTek logo" />,
  },
];

export default function Experience() {
  return (
    <div
      className="relative z-10 min-h-screen"
      style={{ backgroundColor: "#5da5d5" }}
    >
      <div className="flex items-center justify-center px-6 py-20">
        <div className="max-w-4xl mx-auto w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white drop-shadow-lg">
            Experience
          </h2>
          <div className="space-y-6 flex flex-col gap-6">
            {experience.map((exp) => (
              <div
                key={exp.company}
                className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/20 hover:shadow-3xl hover:scale-[1.01] transition-all duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center shadow-md p-3 flex-shrink-0">
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-full w-full flex items-center justify-center [&>svg]:h-full [&>svg]:w-auto [&>img]:h-full [&>img]:w-auto [&>img]:object-contain hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        {exp.logo}
                      </a>
                    </div>
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-2xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {exp.company}
                    </a>
                  </div>
                  <div className="flex flex-col gap-2 items-end">
                    <span className="text-gray-600 font-medium text-sm md:text-base whitespace-nowrap">
                      {exp.title}
                    </span>
                    <span className="text-gray-600 font-medium text-sm md:text-base whitespace-nowrap">
                      {exp.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
