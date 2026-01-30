import Container from './ui/Container';
import { siteContent } from '../data/content';
import './Proof.css';

export default function Proof() {
  const { title, items } = siteContent.proof;

  return (
    <section className="proof">
      <Container>
        <h2 className="proof__title">{title}</h2>
        <div className="proof__grid">
          {items.map((item, index) => (
            <div key={index} className="proof__item">
              <span className="proof__metric">{item.metric}</span>
              <span className="proof__description">{item.description}</span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
