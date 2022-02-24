import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "./contexts/theme";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Projects from "./components/Projects/Projects";
import "./App.css";
import ActivityCalendar from "react-activity-calendar";
import ReactTooltip from "react-tooltip";

export default function App() {
  const [{ themeName }] = useContext(ThemeContext);

  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      const response = await fetch(
        "https://github-contributions-api.jogruber.de/v4/linus-gellhorn"
      );
      const jsonBody = await response.json();

      setContributions(jsonBody.contributions);
    };
    fetchGitHubData();
  }, []);

  console.log(contributions);

  return (
    <div className={`${themeName} app`}>
      <Header />
      <main>
        <About />
        <div className="github">
          <ActivityCalendar data={contributions.slice(0, 365)}>
            <ReactTooltip html />
          </ActivityCalendar>
        </div>
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
