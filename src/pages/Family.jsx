import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import './Family.css';

export default function Family() {
  return (
    <>
      <Seo
        title="Family"
        path="/family"
        description="A glimpse into my life outside of work."
      />
      <PageNav />
      <main className="family-page">
        <Container size="narrow">
          <header className="family-page__header">
            <h1>Family</h1>
            <p>A glimpse into my life outside of work</p>
          </header>

          <section className="family-page__content">
            <p className="family-page__intro">
              Beyond my professional work, I'm a husband and father. Family is at the
              center of everything I do, and they're my greatest source of motivation
              and joy.
            </p>

            <div className="family-page__gallery">
              <figure className="family-page__photo family-page__photo--featured">
                <img
                  src="/images/family/family-1.jpg"
                  alt="Family photo"
                  width="600"
                  height="400"
                />
              </figure>
              <figure className="family-page__photo">
                <img
                  src="/images/family/family-2.jpg"
                  alt="Family photo"
                  width="300"
                  height="300"
                />
              </figure>
              <figure className="family-page__photo">
                <img
                  src="/images/family/family-3.jpg"
                  alt="Family photo"
                  width="300"
                  height="300"
                />
              </figure>
            </div>

            <p className="family-page__note">
              When I'm not working on transformation initiatives, you'll find me spending
              time with my family, exploring new places, and enjoying the simple moments
              that make life meaningful.
            </p>
          </section>

          <div className="family-page__back">
            <Link to="/about">&larr; Back to About</Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
