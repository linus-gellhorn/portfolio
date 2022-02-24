import GitHubIcon from "@material-ui/icons/GitHub";
import LaunchIcon from "@material-ui/icons/Launch";
import { projects } from "../../content";
import "./Projects.css";

const Projects = () => {
  if (!projects.length) return null;

  return (
    <section id="projects" className="section projects">
      <h2 className="section__title">Projects</h2>
      <div className="projects__grid">
        {projects.map((project) => (
          <div key={projects.indexOf(project)} className="projects__container">
            <h4>{project.name}</h4>
            <p className="projects__description">{project.description}</p>
            {project.stack && (
              <ul className="projects__stack">
                {project.stack.map((item) => (
                  <li
                    key={projects.indexOf(project)}
                    className="projects__stack-item"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {project.livePreview && (
              <a href={project.livePreview} className="link link--icon">
                View live site <br />
                <LaunchIcon />
              </a>
            )}
            {project.image && (
              <a href={project.livePreview} target="_blank" rel="noreferrer">
                <img
                  className="projects__image"
                  src={project.image}
                  alt="project screenshot"
                />
              </a>
            )}

            <br />
            {project.sourceCode && (
              <a href={project.sourceCode} className="link link--icon">
                View GitHub Repo <br /> <GitHubIcon />
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
