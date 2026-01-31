import './Projects.css';

export default function ProjectCard({ project }) {
  const { title, company, challenge, solution, impact, description, tags, image } = project;

  // Support both old format (description) and new case study format (challenge/solution/impact)
  const isCaseStudy = challenge && solution && impact;

  return (
    <article className="project-card">
      {image && (
        <div className="project-card__image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="project-card__content">
        {company && <span className="project-card__company">{company}</span>}
        <h3 className="project-card__title">{title}</h3>

        {isCaseStudy ? (
          <div className="project-card__case-study">
            <div className="project-card__section">
              <span className="project-card__label">Challenge</span>
              <p>{challenge}</p>
            </div>
            <div className="project-card__section">
              <span className="project-card__label">Solution</span>
              <p>{solution}</p>
            </div>
            <div className="project-card__section">
              <span className="project-card__label">Impact</span>
              <p>{impact}</p>
            </div>
          </div>
        ) : (
          <p className="project-card__description">{description}</p>
        )}

        <div className="project-card__tags">
          {tags.map((tag, index) => (
            <span key={index} className="project-card__tag">{tag}</span>
          ))}
        </div>
      </div>
    </article>
  );
}
