import Container from './ui/Container';
import { siteContent } from '../data/content';
import './Proof.css';

export default function Proof() {
  const { title, items } = siteContent.proof;

  const scrollToCaseStudy = (caseStudyId) => {
    const element = document.getElementById(`case-study-${caseStudyId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add highlight effect
      element.classList.add('project-card--highlight');
      setTimeout(() => {
        element.classList.remove('project-card--highlight');
      }, 2000);
    }
  };

  return (
    <section id="impact" className="proof">
      <Container>
        <h2 className="proof__title">{title}</h2>
        <div className="proof__grid">
          {items.map((item, index) => (
            <button
              key={index}
              className="proof__item"
              onClick={() => scrollToCaseStudy(item.caseStudyId)}
              aria-label={`View case study: ${item.description}`}
            >
              <span className="proof__metric">{item.metric}</span>
              <span className="proof__description">{item.description}</span>
              <span className="proof__link">View case study →</span>
            </button>
          ))}
        </div>
      </Container>
    </section>
  );
}
