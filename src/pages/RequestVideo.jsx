import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { upload } from '@vercel/blob/client';
import PageNav from '../components/PageNav';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import VideoPlayer from '../components/VideoPlayer';
import Seo from '../components/Seo';
import { siteContent } from '../data/content';
import './RequestVideo.css';

export default function RequestVideo() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    quote: '',
  });
  const [videoFile, setVideoFile] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const { title, subtitle, prompts } = siteContent.requestVideo;

  // Create object URL for video preview
  const videoPreviewUrl = useMemo(() => {
    return videoFile ? URL.createObjectURL(videoFile) : null;
  }, [videoFile]);

  // Clean up object URL on unmount or when file changes
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 100 * 1024 * 1024) {
        setErrorMessage('Video file must be under 100MB');
        return;
      }
      setVideoFile(file);
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const isProd = import.meta.env.PROD;

      // In production (Vercel), upload videos directly to Blob (serverless body limit is ~4.5MB).
      // In development, keep the existing Express+multer flow.
      let videoUrl = null;
      if (videoFile && isProd) {
        const ext = (videoFile.name.split('.').pop() || 'mp4').toLowerCase();
        const id = globalThis.crypto?.randomUUID
          ? globalThis.crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        const pathname = `testimonials/videos/${id}.${ext}`;

        const blob = await upload(pathname, videoFile, {
          access: 'public',
          handleUploadUrl: '/api/blob/video',
        });
        videoUrl = blob.url;
      }

      let response;
      if (isProd) {
        response = await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            title: formData.title,
            company: formData.company,
            quote: formData.quote,
            videoUrl,
          }),
        });
      } else {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('title', formData.title);
        data.append('company', formData.company);
        data.append('quote', formData.quote);
        if (videoFile) {
          data.append('video', videoFile);
        }

        response = await fetch('/api/testimonials', {
          method: 'POST',
          body: data,
        });
      }

      if (!response.ok) {
        let message = 'Failed to submit testimonial';
        try {
          const error = await response.json();
          message = error.error || message;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  if (status === 'success') {
    return (
      <>
        <Seo title="Thank You" path="/request-video" noindex />
        <PageNav />
        <div className="request-video">
          <Container size="narrow">
            <div className="request-video__success">
              <div className="request-video__success-icon">&#10003;</div>
              <h1>Thank You!</h1>
              <p>Your testimonial has been submitted for review.</p>
              <Button as={Link} to="/">
                Back to Home
              </Button>
            </div>
          </Container>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title="Share Your Experience" path="/request-video" noindex />
      <PageNav />
      <div className="request-video">
        <Container size="narrow">
          <div className="request-video__header">
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>

        <div className="request-video__prompts">
          <h3>Some ideas for your video:</h3>
          <ul>
            {prompts.map((prompt, index) => (
              <li key={index}>{prompt}</li>
            ))}
          </ul>
        </div>

        <form className="request-video__form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Your Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              placeholder="Jane Smith"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title">Job Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Engineering Manager"
              />
            </div>

            <div className="form-group">
              <label htmlFor="company">Company</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Acme Corp"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="quote">Your Testimonial *</label>
            <textarea
              id="quote"
              name="quote"
              value={formData.quote}
              onChange={handleInputChange}
              required
              rows={4}
              placeholder="Share your experience working with me..."
            />
          </div>

          <div className="form-group">
            <label htmlFor="video">Video (optional)</label>
            <div className="file-input">
              <input
                type="file"
                id="video"
                accept="video/*"
                onChange={handleFileChange}
              />
              <div className="file-input__label">
                {videoFile ? (
                  <span className="file-input__name">{videoFile.name}</span>
                ) : (
                  <span>Click or drag to upload a video (max 100MB)</span>
                )}
              </div>
            </div>
            {videoPreviewUrl && (
              <div className="request-video__preview">
                <VideoPlayer src={videoPreviewUrl} alt="Video preview" />
              </div>
            )}
          </div>

          {errorMessage && (
            <div className="form-error">{errorMessage}</div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={status === 'loading'}
            className="request-video__submit"
          >
            {status === 'loading' ? 'Submitting...' : 'Submit Testimonial'}
          </Button>
        </form>
        </Container>
      </div>
    </>
  );
}
