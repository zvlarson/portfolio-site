import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Seo from '../components/Seo';
import { siteContent } from '../data/content';
import './AboutPage.css';

export default function AboutPage() {
  const { bio, email, linkedin, github } = siteContent.about;

  return (
    <>
      <Seo
        title="Professional"
        path="/about"
        description="Learn more about Zach Larson - enterprise transformation leader specializing in people, strategy, and operations."
        type="profile"
      />
      <PageNav />
      <main className="about-page">
        <Container size="narrow">
          <header className="about-page__header">
            <div className="about-page__photos">
              <img
                src="/images/professional/about-main.webp"
                alt="Zach Larson"
                className="about-page__photo--main"
                width="350"
                height="350"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="about-page__intro">
              <h1>Zachary Larson</h1>
              <p className="about-page__tagline">MBA, SHRM-SCP</p>
              <p className="about-page__subtitle">
                Enterprise Transformation Leader | People, Strategy, & Operations
              </p>
            </div>
          </header>

          <section className="about-page__bio">
            {bio.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section className="about-page__credentials">
            <h2>Credentials & Education</h2>
            <ul>
              <li>MBA, Supply Chain Management & Marketing - Florida State University</li>
              <li>SHRM-SCP Certification</li>
              <li>Software Engineering - Boca Code</li>
              <li>Product Management - The Product School</li>
            </ul>
          </section>

          <section className="about-page__connect">
            <h2>Let's Connect</h2>
            <p>I'm always interested in discussing transformation opportunities and strategic partnerships.</p>
            <div className="about-page__links">
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
          </section>

          <div className="about-page__family-link">
            <Link to="/family">Personal &rarr;</Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
