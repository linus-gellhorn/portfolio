const credits: {
  label: string;
  url: string;
}[] = [
  {
    label: "Three.js cloud",
    url: "https://threejs.org/examples/?q=cloud#webgl_volume_cloud",
  },
  {
    label: "Simpsons font",
    url: "https://www.textstudio.com/logo/the-simpsons-font-1322",
  },
  {
    label: "My childhood",
    url: "https://www.youtube.com/watch?v=aPzS3QYb868",
  },
];

export default function Credits() {
  if (credits.length === 0) return null;

  return (
    <div className="relative z-10 py-8 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center text-sm text-white/90">
          <span className="block mb-2">Credits & Inspiration:</span>
          <ul className="list-disc list-inside inline-block text-left">
            {credits.map((credit) => (
              <li key={credit.url}>
                <a
                  href={credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-white underline underline-offset-2 transition-colors"
                >
                  {credit.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
