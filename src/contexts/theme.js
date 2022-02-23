import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import useSound from "use-sound";
import pop from "../sounds/pop.wav";

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [themeName, setThemeName] = useState("light");
  const [play] = useSound(pop);

  useEffect(() => {
    const isDark = localStorage.getItem("themeName") === "dark";
    if (isDark) setThemeName("dark");
  }, []);

  const toggleTheme = () => {
    const name = themeName === "dark" ? "light" : "dark";
    localStorage.setItem("themeName", name);
    setThemeName(name);
    play();
  };

  return (
    <ThemeContext.Provider value={[{ themeName, toggleTheme }]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { ThemeProvider, ThemeContext };
