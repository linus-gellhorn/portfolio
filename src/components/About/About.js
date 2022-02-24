import "./About.css";
import "../../App.css";
import headshot from "../../images/headshot.png";

const About = () => {
  return (
    <section className="about" id="about">
      <h1>Hey! I'm Linus.</h1>
      <img src={headshot} alt="A headshot of Linus" className="headshot" />
      <h3 className="about__role">Welcome to my website 👋</h3>
      <p className="about__desc">
        I am an aspiring software engineer, just beginning my journey into the
        world of all things code.
      </p>
      <p className="about__desc">
        Over the last 5 months, I've been busy <em>(see below!)</em> completing
        a bootcamp in full-stack software engineering and tech leadership. Have
        a look around to see what I've been up to!
      </p>
    </section>
  );
};

export default About;
