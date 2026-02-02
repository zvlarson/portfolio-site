import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Footer from '../components/Footer';
import Container from '../components/ui/Container';
import Seo from '../components/Seo';
import { placeholderProjects } from '../data/content';
import './CaseStudies.css';

export default function CaseStudies() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setProjects(data);
        } else {
          setProjects(placeholderProjects);
        }
        setLoading(false);
      })
      .catch(() => {
        setProjects(placeholderProjects);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Seo
        title="Case Studies"
        path="/case-studies"
        description="Explore real-world case studies showcasing enterprise transformation, organizational effectiveness, and measurable business impact."
      />
      <PageNav />
      <main className="case-studies-page">
        <Container>
          <header className="case-studies-page__header">
            <h1>Case Studies</h1>
            <p>Real challenges, innovative solutions, measurable impact</p>
          </header>

          {loading ? (
            <div className="case-studies-page__loading">Loading case studies...</div>
          ) : (
            <div className="case-studies-page__grid">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/case-studies/${project.slug || project.id}`}
                  className="case-studies-page__card"
                >
                  <span className="case-studies-page__company">{project.company}</span>
                  <h2 className="case-studies-page__title">{project.title}</h2>
                  <p className="case-studies-page__summary">
                    {project.summary || project.challenge}
                  </p>
                  <div className="case-studies-page__tags">
                    {project.tags?.slice(0, 3).map((tag, index) => (
                      <span key={index} className="case-studies-page__tag">{tag}</span>
                    ))}
                  </div>
                  <span className="case-studies-page__cta">Read case study</span>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
