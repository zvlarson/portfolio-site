import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import './TestimonialsPage.css';

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, video, written

  useEffect(() => {
    fetch('/api/testimonials?approved=true')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredTestimonials = testimonials.filter((t) => {
    if (filter === 'video') return t.videoUrl;
    if (filter === 'written') return !t.videoUrl;
    return true;
  });

  const hasVideos = testimonials.some(t => t.videoUrl);
  const hasWritten = testimonials.some(t => !t.videoUrl);

  return (
    <>
      <Seo
        title="Testimonials"
        path="/testimonials"
        description="Read and watch testimonials from colleagues and clients about working with Zach Larson."
      />
      <PageNav />
      <main className="testimonials-page">
        <Container>
          <header className="testimonials-page__header">
            <h1>Testimonials</h1>
            <p>Hear from colleagues and clients</p>
          </header>

          {loading ? (
            <div className="testimonials-page__loading">Loading testimonials...</div>
          ) : testimonials.length === 0 ? (
            <div className="testimonials-page__empty">
              <p>No testimonials yet.</p>
              <Link to="/request-video" className="testimonials-page__cta">
                Be the first to share your experience
              </Link>
            </div>
          ) : (
            <>
              {(hasVideos && hasWritten) && (
                <div className="testimonials-page__filters">
                  <button
                    className={`testimonials-page__filter ${filter === 'all' ? 'testimonials-page__filter--active' : ''}`}
                    onClick={() => setFilter('all')}
                  >
                    All
                  </button>
                  <button
                    className={`testimonials-page__filter ${filter === 'video' ? 'testimonials-page__filter--active' : ''}`}
                    onClick={() => setFilter('video')}
                  >
                    Video
                  </button>
                  <button
                    className={`testimonials-page__filter ${filter === 'written' ? 'testimonials-page__filter--active' : ''}`}
                    onClick={() => setFilter('written')}
                  >
                    Written
                  </button>
                </div>
              )}

              <div className="testimonials-page__grid">
                {filteredTestimonials.map((testimonial) => (
                  <article key={testimonial.id} className="testimonials-page__card">
                    {testimonial.videoUrl && (
                      <div className="testimonials-page__video">
                        {testimonial.videoUrl.includes('youtube') || testimonial.videoUrl.includes('vimeo') ? (
                          <iframe
                            src={testimonial.videoUrl}
                            title={`Video testimonial from ${testimonial.name}`}
                            allowFullScreen
                          />
                        ) : (
                          <video controls preload="metadata">
                            <source src={testimonial.videoUrl} type="video/mp4" />
                          </video>
                        )}
                      </div>
                    )}

                    <blockquote className="testimonials-page__quote">
                      "{testimonial.quote}"
                    </blockquote>

                    <footer className="testimonials-page__author">
                      <span className="testimonials-page__name">{testimonial.name}</span>
                      {(testimonial.title || testimonial.company) && (
                        <span className="testimonials-page__title">
                          {testimonial.title}{testimonial.company && `, ${testimonial.company}`}
                        </span>
                      )}
                    </footer>

                    {testimonial.caseStudySlugs?.length > 0 && (
                      <div className="testimonials-page__related">
                        <span>Related:</span>
                        {testimonial.caseStudySlugs.map((slug) => (
                          <Link key={slug} to={`/case-studies/${slug}`}>
                            View case study
                          </Link>
                        ))}
                      </div>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
