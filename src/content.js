/* 
All info should be able to be input here,
which will then populate the corresponding components 
*/
import signLearner from "./images/sign-learner.png";
import decisionizer from "./images/decisionizer.png";
import pianoApp from "./images/piano-app.png";

const header = {
  homepage: "#",
  title: "Linus Gellhorn",
};

const about = {
  name: "Linus Gellhorn",
  description: `Hey! I am a junior software engineer, just beginning my journey into the world of all things code.\nI've recently completed a 5 month bootcamp in full-stack software engineering and tech leadership. \nHave a look around to see what I've been up to recently!`,
};

const skills = [
  "JavaScript",
  "TypeScript",
  "React",
  "HTML",
  "CSS",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Git",
  "CI/CD",
  "Jest testing",
];

const projects = [
  {
    name: "Sign Learner",
    description:
      "A Google Chrome extension that helps you learn sign language while browsing the internet.",
    stack: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    sourceCode: "https://github.com/linus-gellhorn/SL-chrome-extension",
    livePreview: "https://signlearner.netlify.app",
    image: signLearner,
  },
  {
    name: "Decisionizer",
    description: "A React app to help simplify decision making.",
    stack: ["TypeScript", "React", "React Flow", "Material UI"],
    sourceCode: "https://github.com/linus-gellhorn/decisionizer",
    livePreview: "https://decisionizer.netlify.app",
    image: decisionizer,
  },
  {
    name: "Piano App",
    description:
      "A React app to practise piano right from your keyboard. The first project I built from scratch!",
    stack: ["HTML", "CSS", "TypeScript", "React"],
    sourceCode: "https://github.com/linus-gellhorn/piano-app",
    livePreview: "https://piano-react-app.netlify.app",
    image: pianoApp,
  },
];

const contact = {
  email: "linus.g@hotmail.com",
  social: {
    linkedin: "https://www.linkedin.com/in/linusgellhorn",
    github: "https://github.com/linus-gellhorn",
  },
};

export { header, about, skills, projects, contact };
