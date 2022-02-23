import { contact } from "../../content";
import "./Contact.css";

const Contact = () => {
  if (!contact.email) return null;

  return (
    <section className="section contact center" id="contact">
      <h2 className="section__title">Contact</h2>
      <button>
        <h5>Email me</h5>
      </button>
    </section>
  );
};

export default Contact;
