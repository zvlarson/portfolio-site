import { useState, useEffect } from 'react';
import Container from './ui/Container';
import TestimonialCard from './TestimonialCard';
import { siteContent } from '../data/content';
import './Testimonials.css';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/testimonials?approved=true')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch testimonials');
        return res.json();
      })
      .then((data) => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const { title, subtitle } = siteContent.testimonials;

  if (loading) {
    return (
      <section id="testimonials" className="testimonials">
        <Container>
          <div className="testimonials__header">
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>
          <div className="testimonials__loading">Loading testimonials...</div>
        </Container>
      </section>
    );
  }

  if (error || testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="testimonials">
      <Container>
        <div className="testimonials__header">
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div className="testimonials__grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </Container>
    </section>
  );
}
