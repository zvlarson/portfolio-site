import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Seo from '../components/Seo';
import './Admin.css';

const CASE_STUDY_OPTIONS = [
  { slug: 'enterprise-employee-listening', title: 'Enterprise Employee Listening Program' },
  { slug: 'talent-acquisition-transformation', title: 'Talent Acquisition & HR Transformation' },
  { slug: 'high-volume-recruiting-turnaround', title: 'High-Volume Recruiting Turnaround' },
  { slug: 'product-innovation-revenue-growth', title: 'Product Innovation & Revenue Growth' },
];

export default function Admin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending');
  const [adminSecret, setAdminSecret] = useState(() => localStorage.getItem('adminSecret') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({ caseStudySlugs: [] });

  const getAuthHeaders = useCallback(() => ({
    'Content-Type': 'application/json',
    'x-admin-secret': adminSecret,
  }), [adminSecret]);

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/api/testimonials';
      if (filter === 'pending') {
        url += '?approved=false';
      } else if (filter === 'approved') {
        url += '?approved=true';
      }

      const response = await fetch(url, {
        headers: filter === 'approved' ? undefined : { 'x-admin-secret': adminSecret },
      });
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [adminSecret, filter]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchTestimonials();
    }
  }, [fetchTestimonials, isAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/testimonials?approved=false', {
        headers: { 'x-admin-secret': adminSecret },
      });
      if (response.ok) {
        localStorage.setItem('adminSecret', adminSecret);
        setIsAuthenticated(true);
      } else {
        alert('Invalid admin secret');
      }
    } catch {
      setIsAuthenticated(true);
    }
  };

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ approved: true }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized. Please check your admin secret.');
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to approve');
      }
      fetchTestimonials();
    } catch {
      alert('Failed to approve testimonial');
    }
  };

  const handleReject = async (id) => {
    if (!confirm('Are you sure you want to reject and delete this testimonial?')) return;

    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized. Please check your admin secret.');
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to delete');
      }
      fetchTestimonials();
    } catch {
      alert('Failed to delete testimonial');
    }
  };

  const handleUnapprove = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ approved: false }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized. Please check your admin secret.');
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to unapprove');
      }
      fetchTestimonials();
    } catch {
      alert('Failed to unapprove testimonial');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingId(testimonial.id);
    setEditData({
      caseStudySlugs: testimonial.caseStudySlugs || [],
    });
  };

  const handleCaseStudyToggle = (slug) => {
    setEditData(prev => ({
      ...prev,
      caseStudySlugs: prev.caseStudySlugs.includes(slug)
        ? prev.caseStudySlugs.filter(s => s !== slug)
        : [...prev.caseStudySlugs, slug],
    }));
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({ caseStudySlugs: editData.caseStudySlugs }),
      });
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized. Please check your admin secret.');
          setIsAuthenticated(false);
          return;
        }
        throw new Error('Failed to save');
      }
      setEditingId(null);
      fetchTestimonials();
    } catch {
      alert('Failed to save changes');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin">
        <Seo title="Admin" path="/admin" noindex />
        <PageNav />
        <Container>
          <div className="admin__login">
            <h1>Admin Login</h1>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                placeholder="Enter admin secret"
                value={adminSecret}
                onChange={(e) => setAdminSecret(e.target.value)}
                className="admin__secret-input"
              />
              <Button type="submit" variant="primary">
                Login
              </Button>
            </form>
            <Link to="/" className="admin__back-link">Back to Site</Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="admin">
      <Seo title="Admin" path="/admin" noindex />
      <PageNav />
      <Container>
        <div className="admin__header">
          <div className="admin__title-row">
            <Link to="/" className="admin__back">&larr; Back to Site</Link>
            <h1>Testimonial Admin</h1>
          </div>

          <div className="admin__filters">
            <button
              className={`admin__filter ${filter === 'pending' ? 'admin__filter--active' : ''}`}
              onClick={() => setFilter('pending')}
            >
              Pending
            </button>
            <button
              className={`admin__filter ${filter === 'approved' ? 'admin__filter--active' : ''}`}
              onClick={() => setFilter('approved')}
            >
              Approved
            </button>
            <button
              className={`admin__filter ${filter === 'all' ? 'admin__filter--active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All
            </button>
          </div>
        </div>

        {loading && <div className="admin__loading">Loading testimonials...</div>}

        {error && <div className="admin__error">{error}</div>}

        {!loading && !error && testimonials.length === 0 && (
          <div className="admin__empty">
            No {filter === 'all' ? '' : filter} testimonials found.
          </div>
        )}

        {!loading && !error && testimonials.length > 0 && (
          <div className="admin__list">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="admin__card">
                <div className="admin__card-content">
                  {testimonial.videoUrl && (
                    <div className="admin__video">
                      <video controls preload="metadata">
                        <source src={testimonial.videoUrl} type="video/mp4" />
                      </video>
                    </div>
                  )}

                  <div className="admin__info">
                    <div className="admin__meta">
                      <span className="admin__name">{testimonial.name}</span>
                      {(testimonial.title || testimonial.company) && (
                        <span className="admin__position">
                          {testimonial.title}
                          {testimonial.company && `, ${testimonial.company}`}
                        </span>
                      )}
                    </div>

                    <blockquote className="admin__quote">
                      "{testimonial.quote}"
                    </blockquote>

                    <div className="admin__footer">
                      <span className={`admin__status admin__status--${testimonial.approved ? 'approved' : 'pending'}`}>
                        {testimonial.approved ? 'Approved' : 'Pending'}
                      </span>
                      <span className="admin__type">
                        {testimonial.type || (testimonial.videoUrl ? 'video' : 'written')}
                      </span>
                      <span className="admin__date">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {testimonial.caseStudySlugs?.length > 0 && (
                      <div className="admin__case-studies">
                        <span>Linked to:</span>
                        {testimonial.caseStudySlugs.map(slug => (
                          <span key={slug} className="admin__case-study-tag">
                            {CASE_STUDY_OPTIONS.find(o => o.slug === slug)?.title || slug}
                          </span>
                        ))}
                      </div>
                    )}

                    {editingId === testimonial.id && (
                      <div className="admin__edit-panel">
                        <h4>Link to Case Studies</h4>
                        <div className="admin__checkbox-group">
                          {CASE_STUDY_OPTIONS.map(option => (
                            <label key={option.slug} className="admin__checkbox-label">
                              <input
                                type="checkbox"
                                checked={editData.caseStudySlugs.includes(option.slug)}
                                onChange={() => handleCaseStudyToggle(option.slug)}
                              />
                              {option.title}
                            </label>
                          ))}
                        </div>
                        <div className="admin__edit-actions">
                          <Button variant="primary" size="sm" onClick={() => handleSaveEdit(testimonial.id)}>
                            Save
                          </Button>
                          <Button variant="secondary" size="sm" onClick={() => setEditingId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="admin__actions">
                  {editingId !== testimonial.id && (
                    <Button variant="secondary" size="sm" onClick={() => handleEdit(testimonial)}>
                      Edit
                    </Button>
                  )}
                  {!testimonial.approved ? (
                    <>
                      <Button variant="success" size="sm" onClick={() => handleApprove(testimonial.id)}>
                        Approve
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleReject(testimonial.id)}>
                        Reject
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="secondary" size="sm" onClick={() => handleUnapprove(testimonial.id)}>
                        Unapprove
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleReject(testimonial.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
