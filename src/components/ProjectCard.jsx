import './Projects.css';

export default function ProjectCard({ project }) {
  const { title, description, tags, image } = project;

  return (
    <article className="project-card">
      {image && (
        <div className="project-card__image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="project-card__content">
        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__description">{description}</p>
        <div className="project-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
