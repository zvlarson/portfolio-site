import Container from './ui/Container';
import Button from './ui/Button';
import { siteContent } from '../data/content';
import './About.css';

export default function About() {
  const { title, bio, email, linkedin, github } = siteContent.about;

  return (
    <section id="about" className="about">
      <Container size="narrow">
        <div className="about__content">
          <h2>{title}</h2>
          <div className="about__bio">
            {bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          <div id="connect" className="about__contact">
            <h3>Let's Connect</h3>
            <div className="about__links">
              <Button
                as="a"
                href={`mailto:${email}`}
                variant="primary"
              >
                Email Me
              </Button>
              <Button
                as="a"
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                LinkedIn
              </Button>
              <Button
                as="a"
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
