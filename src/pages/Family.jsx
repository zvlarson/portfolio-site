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
        title="Personal"
        path="/family"
        description="I'm Zach — husband to Haley, dad to Camden and Cooper. A glimpse into my life outside of work."
      />
      <PageNav />
      <main className="family-page">
        {/* Hero Section */}
        <section className="family-hero">
          <Container size="narrow">
            <p className="family-hero__intro">
              I'm Zach — husband to Haley, and dad to two little boys: Camden and Cooper.
              Most days, you'll find me doing the simple things I love most.
            </p>
            <figure className="family-hero__photo">
              <img
                src="/images/family/camden-flying.webp"
                alt="Father and son moment"
                loading="eager"
                decoding="async"
              />
            </figure>
          </Container>
        </section>

        {/* Family Section */}
        <section className="family-section">
          <Container size="narrow">
            <h2>The Family</h2>
            <p>
              Camden was born in February 2023, and Cooper joined us in December 2025.
              Most days, you'll find me playing ball or racing cars with Camden, watching
              college hoops or baseball or football, and trying to soak up life's little
              moments that go by too fast.
            </p>
            <p>
              Baseball has always been a thread in my life, so I couldn't resist sneaking
              it into our kids' names. <strong>Camden</strong> is a nod to Camden Yards, and{' '}
              <strong>Cooper</strong> is for Cooperstown. Just a small way of honoring something
              that's brought me a lot of joy and connection over the years.
            </p>
            <div className="family-section__gallery">
              <figure>
                <img
                  src="/images/family/family-with-cooper.webp"
                  alt="Family photo with newborn"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src="/images/family/zach-camden-moment.webp"
                  alt="A sweet father-son moment"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src="/images/family/zach-camden-rangers.webp"
                  alt="Matching hockey jerseys"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </Container>
        </section>

        {/* Roots & Sports Section */}
        <section className="family-section family-section--alt">
          <Container size="narrow">
            <h2>Roots & Sports</h2>
            <p>
              I'm a New Yorker at heart and a proud Florida State alum. I'm loyal to my
              teams — Yankees, Jets, Rangers, and the Noles — and sports have always been
              one of the main ways I recharge.
            </p>
            <p>
              Basketball in particular is my therapy… whether that's playing, shooting
              around, or stealing a few quiet minutes on a court.
            </p>
            <div className="family-section__gallery family-section__gallery--two">
              <figure>
                <img
                  src="/images/family/haley-zach-fsu.webp"
                  alt="Couple at sunset"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure>
                <img
                  src="/images/family/basketball-team.webp"
                  alt="Basketball team photo"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </Container>
        </section>

        {/* What I Care About Section */}
        <section className="family-section">
          <Container size="narrow">
            <h2>Values & Perspective</h2>

            <div className="family-story">
              <div className="family-story__content">
                <h3>Remembering Kate</h3>
                <p>
                  Walking and running help me clear my head, and they also keep me connected
                  to my sister Kate, who we lost to a rare brain cancer in 2024. She was an
                  incredible athlete — a two-time All-American and 4th in the country in the
                  steeplechase — and her grit and spirit still influence how I try to show
                  up every day.
                </p>
              </div>
              <figure className="family-story__photo">
                <img
                  src="/images/family/kate-running.webp"
                  alt="Track and field competition"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="family-story family-story--reverse">
              <div className="family-story__content">
                <h3>My Dad's Story</h3>
                <p>
                  One of the biggest reasons I believe so deeply in resilience and service
                  comes from my Dad's story. In 1988, he survived an 80-foot fall from the
                  Brooklyn Bridge. He was an ironworker with Local 40 when the platform beneath
                  him snapped. On the way down, he hit wires before landing in a debris net.
                  He broke nearly everything — but he survived.
                </p>
                <p>
                  That second chance shaped the rest of his life. For more than 30 years, he
                  dedicated himself to serving others as a social worker, including 17 years
                  with the U.S. Department of Veterans Affairs helping veterans living with PTSD.
                  Watching him turn a life-changing moment into a lifetime of purpose has stayed
                  with me.
                </p>
                <p>
                  It's a constant reminder for me not to take things for granted — and to do
                  work that serves people in a real way.
                </p>
              </div>
              <figure className="family-story__photo">
                <img
                  src="/images/family/zach-and-dad.webp"
                  alt="Father and son in New York City"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>

            <div className="family-callout">
              <h3>Autism Awareness</h3>
              <p>
                Autism is also close to my heart. I have a couple of family members on the
                spectrum, and it's shaped the way I think about patience, communication, and
                building environments where people can truly thrive.
              </p>
            </div>
          </Container>
        </section>

        {/* Video Moment Section */}
        <section className="family-section family-section--video">
          <Container size="narrow">
            <h2>A Favorite Moment</h2>
            <p className="family-video__caption">
              And one of my favorite small moments to share is a clip from a basketball game
              last year — Camden's pure joy is hard to beat. I captioned it:
            </p>
            <figure className="family-video">
              <video
                controls
                playsInline
              >
                <source src="/images/family/camden-basketball.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <figcaption>
                "When the org approves the budget for employee engagement initiatives." 🤣
                <span className="family-video__age">
                  He was 22 months old, and I hope it makes you smile as much as it still makes me smile.
                </span>
              </figcaption>
            </figure>
          </Container>
        </section>

        <Container size="narrow">
          <div className="family-page__back">
            <Link to="/about">&larr; Back to Professional</Link>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
