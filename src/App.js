import { useContext } from "react";
import { ThemeContext } from "./contexts/theme";
import Header from "./components/Header/Header";
import "./App.css";

export default function App() {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <div className={`${themeName} app`}>
      <Header />
      <main>
        <p>Hello Linus</p>
      </main>
    </div>
  );
}
