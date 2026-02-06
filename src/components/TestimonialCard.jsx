import VideoPlayer from './VideoPlayer';
import './Testimonials.css';

export default function TestimonialCard({ testimonial }) {
  const { name, title, company, quote, videoUrl } = testimonial;

  return (
    <div className="testimonial-card">
      {videoUrl && (
        <div className="testimonial-card__video">
          <VideoPlayer src={videoUrl} alt={`Video testimonial from ${name}`} />
        </div>
      )}
      <blockquote className="testimonial-card__quote">"{quote}"</blockquote>
      <div className="testimonial-card__author">
        <span className="testimonial-card__name">{name}</span>
        <span className="testimonial-card__title">
          {title}{company && `, ${company}`}
        </span>
      </div>
    </div>
  );
}
