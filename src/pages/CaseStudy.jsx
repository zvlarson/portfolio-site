import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import { placeholderProjects } from '../data/content';
import './CaseStudy.css';

export default function CaseStudy() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try to fetch from API first, fall back to placeholder data
    Promise.all([
      fetch('/api/projects').then(res => res.json()).catch(() => []),
      fetch('/api/testimonials?approved=true').then(res => res.json()).catch(() => [])
    ]).then(([projects, allTestimonials]) => {
      const projectList = projects.length > 0 ? projects : placeholderProjects;
      const found = projectList.find(p => p.slug === slug || p.id === slug);

      if (found) {
        setProject(found);
        // Filter testimonials associated with this case study
        const relatedTestimonials = allTestimonials.filter(t =>
          t.caseStudySlugs?.includes(found.slug || found.id)
        );
        setTestimonials(relatedTestimonials);
      }
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <>
        <PageNav />
        <main className="case-study-page">
          <Container>
            <div className="case-study-page__loading">Loading...</div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  if (!project) {
    return (
      <>
        <Seo title="Case Study Not Found" path={`/case-studies/${slug}`} noindex />
        <PageNav />
        <main className="case-study-page">
          <Container>
            <div className="case-study-page__not-found">
              <h1>Case Study Not Found</h1>
              <p>The case study you're looking for doesn't exist.</p>
              <Link to="/case-studies" className="case-study-page__back">
                View all case studies
              </Link>
            </div>
          </Container>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Seo
        title={project.title}
        path={`/case-studies/${project.slug || project.id}`}
        description={project.summary || project.challenge}
        type="article"
      />
      <PageNav />
      <main className="case-study-page">
        <Container size="narrow">
          <Link to="/case-studies" className="case-study-page__breadcrumb">
            &larr; All Case Studies
          </Link>

          <header className="case-study-page__header">
            <span className="case-study-page__company">{project.company}</span>
            <h1>{project.title}</h1>
            {project.tags && (
              <div className="case-study-page__tags">
                {project.tags.map((tag, index) => (
                  <span key={index} className="case-study-page__tag">{tag}</span>
                ))}
              </div>
            )}
          </header>

          <article className="case-study-page__content">
            {project.summary && (
              <section className="case-study-page__section">
                <p className="case-study-page__summary">{project.summary}</p>
              </section>
            )}

            <section className="case-study-page__section">
              <h2>The Challenge</h2>
              <p>{project.challenge}</p>
            </section>

            <section className="case-study-page__section">
              <h2>{project.whatIBuilt ? 'What I Built' : 'The Solution'}</h2>
              <p>{project.whatIBuilt || project.solution}</p>
            </section>

            <section className="case-study-page__section">
              <h2>The Impact</h2>
              <p>{project.impact}</p>
            </section>

            {project.artifacts && project.artifacts.length > 0 && (
              <section className="case-study-page__section">
                <h2>Artifacts</h2>
                <ul className="case-study-page__artifacts">
                  {project.artifacts.map((artifact, index) => (
                    <li key={index}>
                      {artifact.url ? (
                        <a href={artifact.url} target="_blank" rel="noopener noreferrer">
                          {artifact.label}
                        </a>
                      ) : (
                        <span>{artifact.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </article>

          {testimonials.length > 0 && (
            <section className="case-study-page__testimonials">
              <h2>What They Said</h2>
              <div className="case-study-page__testimonials-grid">
                {testimonials.map((testimonial) => (
                  <blockquote key={testimonial.id} className="case-study-page__testimonial">
                    {testimonial.videoUrl && (
                      <div className="case-study-page__testimonial-video">
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
                    <p className="case-study-page__testimonial-quote">"{testimonial.quote}"</p>
                    <footer className="case-study-page__testimonial-author">
                      <span className="case-study-page__testimonial-name">{testimonial.name}</span>
                      {(testimonial.title || testimonial.company) && (
                        <span className="case-study-page__testimonial-title">
                          {testimonial.title}{testimonial.company && `, ${testimonial.company}`}
                        </span>
                      )}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
