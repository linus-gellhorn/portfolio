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
import { sortDataByDate } from "./utils/sortDataByDate";
import { makeDataSortable } from "./utils/makeDataSortable";

export default function App() {
  const [{ themeName }] = useContext(ThemeContext);

  const [contributions, setContributions] = useState([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      const response = await fetch(
        "https://github-contributions-api.jogruber.de/v4/linus-gellhorn"
      );
      const jsonBody = await response.json();

      let sortableData = makeDataSortable(jsonBody.contributions);
      let sortedData = sortDataByDate(sortableData);

      const today = new Date(new Date().setHours(0, 0, 0, 0));
      const todayIndex = sortedData.findIndex(
        (day) => day.date.toString() === today.toString()
      );

      const finalLastYearData = sortedData.slice(
        todayIndex - 364,
        todayIndex + 1
      );

      // re-transform data so it can be used in ActivityCalendar component
      for (let day of finalLastYearData) {
        day.date = new Date(day.date).toISOString().slice(0, 10);
      }

      setContributions(finalLastYearData.slice(185));
    };
    fetchGitHubData();
  }, []);

  const lightTheme = {
    level0: "#ebedf0",
    level1: "#9be9a8",
    level2: "#40c463",
    level3: "#30a14d",
    level4: "#216e39",
  };

  const darkTheme = {
    level0: "#161b22",
    level1: "#0e4429",
    level2: "#0e6d32",
    level3: "#26a641",
    level4: "#39d353",
  };

  console.log(themeName);
  return (
    <div className={`${themeName} app`}>
      <Header />
      <main>
        <About />
        <div className="github">
          <ActivityCalendar
            data={contributions}
            labels={{
              totalCount: `{{count}} contributions in ${contributions.length} days`,
            }}
            theme={themeName === "dark" ? darkTheme : lightTheme}
          >
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
