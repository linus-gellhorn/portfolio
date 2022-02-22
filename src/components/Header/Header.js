import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import { header } from "../../portfolio";
import "./Header.css";

const Header = () => {
  const { homepage, title } = header;

  return (
    <header className="header">
      <h3>
        <a href={homepage} className="link">
          {title}
        </a>
      </h3>
      <nav>
        <ul>
          <li>
            <a href="#projects">Projects</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <button type="button">
          <WbSunnyRoundedIcon />
        </button>
      </nav>
    </header>
  );
};

export default Header;
