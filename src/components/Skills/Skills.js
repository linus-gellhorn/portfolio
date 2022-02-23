import { skills } from "../../content";
import "./Skills.css";

const Skills = () => {
  if (!skills.length) return null;

  return (
    <section className="section skills" id="skills">
      <h2 className="section__title">Skills</h2>
      <ul>
        {skills.map((skill) => (
          <li key={skills.indexOf(skill)} className="skill">
            {skill}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
