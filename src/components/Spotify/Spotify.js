import "./Spotify.css";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/theme";

function Spotify() {
  const [{ themeName }] = useContext(ThemeContext);

  return (
    <>
      <h3 className="spotify-title">What I have on repeat...</h3>
      <iframe
        className="spotify"
        title="Linus' fave songs"
        src={
          themeName === "dark"
            ? "https://open.spotify.com/embed/playlist/7aGQ6jRvVXxFUmdpBM4nbD?utm_source=generator&theme=0"
            : "https://open.spotify.com/embed/playlist/7aGQ6jRvVXxFUmdpBM4nbD?utm_source=generator"
        }
        height="350"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      ></iframe>
    </>
  );
}

export default Spotify;
