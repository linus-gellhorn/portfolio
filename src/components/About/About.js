import { about } from "../../content";
import "./About.css";

const About = () => {
  const { description } = about;

  return (
    <section className="about" id="about">
      <h1>Hi there! 👋</h1>
      <h3 className="about__role">I'm Linus - welcome to my portfolio site!</h3>
      <p className="about__desc">{description && description}</p>
    </section>
  );
};

export default About;
