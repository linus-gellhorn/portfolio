import { contact } from "../../content";
import "./Contact.css";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

const Contact = () => {
  const { email, social } = contact;

  if (!contact) return null;

  return (
    <section className="section contact center" id="contact">
      <h2 className="section__title">Connect</h2>
      <div className="contact-items">
        <button
          // className="contact-item"
          onClick={() => window.open(`mailto:${email}`)}
        >
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
    </section>
  );
};

export default Contact;
