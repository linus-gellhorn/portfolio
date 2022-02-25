import { contact } from "../../content";
import "./Contact.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import { useState, useEffect } from "react";

const Contact = () => {
  const { email, social } = contact;

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () =>
      window.pageYOffset > 500 ? setIsVisible(true) : setIsVisible(false);

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <section className="section contact center" id="contact">
      <h2 className="section__title">Connect</h2>
      <div className="contact-items">
        <button onClick={() => window.open(`mailto:${email}`)}>
          <h5>Email me</h5>
        </button>
        {social && (
          <>
            {social.github && (
              <a
                href={social.github}
                target="_blank"
                rel="noreferrer"
                aria-label="github"
                className="link link--icon contact-item"
              >
                <GitHubIcon />
              </a>
            )}
            {social.linkedin && (
              <a
                href={social.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="linkedin"
                className="link link--icon contact-item"
              >
                <LinkedInIcon />
              </a>
            )}
          </>
        )}
      </div>
      {isVisible && (
        <div className="scroll-top">
          <a href="#top">
            <ArrowUpwardIcon fontSize="large" />
          </a>
        </div>
      )}
    </section>
  );
};

export default Contact;
