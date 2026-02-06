import Container from './ui/Container';
import Button from './ui/Button';
import { siteContent } from '../data/content';
import './Hero.css';

export default function Hero() {
  const { name, credentials, headline, subheadline, tagline, focusAreas, ctaPrimary, ctaSecondary } = siteContent.hero;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero">
      <Container>
        <div className="hero__wrapper">
          <div className="hero__content">
            <p className="hero__greeting">Hi, I'm</p>
            <h1 className="hero__name">{name}{credentials && <span className="hero__credentials">, {credentials}</span>}</h1>
            <p className="hero__headline">{headline}</p>
            <p className="hero__subheadline">{subheadline}</p>
            {tagline && <p className="hero__tagline">{tagline}</p>}
            {focusAreas && <p className="hero__focus-areas">{focusAreas}</p>}
            <div className="hero__cta">
              <Button size="lg" onClick={() => scrollToSection('projects')}>
                {ctaPrimary}
              </Button>
              <Button variant="secondary" size="lg" onClick={() => scrollToSection('about')}>
                {ctaSecondary}
              </Button>
            </div>
          </div>
          <div className="hero__photo">
            <img
              src="/images/professional/hero-headshot.webp"
              alt="Zachary Larson"
              loading="eager"
              decoding="async"
              width="320"
              height="320"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
