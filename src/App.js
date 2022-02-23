import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";
import Header from "./components/Header/Header";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import "./App.css";

export default function App() {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <div className={`${themeName} app`}>
      <Header />
      <main>
        <About />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
