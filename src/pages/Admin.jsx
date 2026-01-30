import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import './Admin.css';

export default function Admin() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('pending'); // pending, approved, all

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      let url = '/api/testimonials';
      if (filter === 'pending') {
        url += '?approved=false';
      } else if (filter === 'approved') {
        url += '?approved=true';
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch testimonials');
      const data = await response.json();
      setTestimonials(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  const handleApprove = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: true }),
      });
      if (!response.ok) throw new Error('Failed to approve');
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
      });
      if (!response.ok) throw new Error('Failed to delete');
      fetchTestimonials();
    } catch {
      alert('Failed to delete testimonial');
    }
  };

  const handleUnapprove = async (id) => {
    try {
      const response = await fetch(`/api/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ approved: false }),
      });
      if (!response.ok) throw new Error('Failed to unapprove');
      fetchTestimonials();
    } catch {
      alert('Failed to unapprove testimonial');
    }
  };

  return (
    <div className="admin">
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
                      <span className="admin__date">
                        {new Date(testimonial.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="admin__actions">
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
