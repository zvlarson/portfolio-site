import Container from './ui/Container';
import Button from './ui/Button';
import { siteContent } from '../data/content';
import './Hero.css';

export default function Hero() {
  const { name, headline, subheadline, ctaPrimary, ctaSecondary } = siteContent.hero;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <Container>
        <div className="hero__content">
          <p className="hero__greeting">Hi, I'm</p>
          <h1 className="hero__name">{name}</h1>
          <p className="hero__headline">{headline}</p>
          <p className="hero__subheadline">{subheadline}</p>
          <div className="hero__cta">
            <Button size="lg" onClick={() => scrollToSection('projects')}>
              {ctaPrimary}
            </Button>
            <Button variant="secondary" size="lg" onClick={() => scrollToSection('about')}>
              {ctaSecondary}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
