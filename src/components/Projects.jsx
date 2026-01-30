import Container from './ui/Container';
import ProjectCard from './ProjectCard';
import { siteContent, placeholderProjects } from '../data/content';
import './Projects.css';

export default function Projects() {
  const { title, subtitle } = siteContent.projects;

  return (
    <section id="projects" className="projects">
      <Container>
        <div className="projects__header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="projects__grid">
          {placeholderProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
