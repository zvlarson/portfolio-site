import { useState, useEffect, useRef } from 'react';
import './VideoPlayer.css';

export default function VideoPlayer({ src, className = '', alt = 'Video' }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [posterUrl, setPosterUrl] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'metadata';
    video.muted = true;

    const handleLoadedData = () => {
      // Seek to first frame
      video.currentTime = 0.1;
    };

    const handleSeeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
        setPosterUrl(dataUrl);
      } catch {
        // If canvas capture fails (e.g., CORS), use video element directly
        setPosterUrl(null);
      }
      video.remove();
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.src = src;
    video.load();

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      video.remove();
    };
  }, [src]);

  const handlePlay = () => {
    setIsPlaying(true);
    // Play video after state update
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {
          // Autoplay might be blocked, user can click play on controls
        });
      }
    }, 0);
  };

  if (!src) return null;

  return (
    <div className={`video-player ${className}`}>
      {isPlaying ? (
        <video
          ref={videoRef}
          className="video-player__video"
          controls
          preload="metadata"
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button
          className="video-player__thumbnail"
          onClick={handlePlay}
          aria-label={`Play ${alt}`}
        >
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={alt}
              className="video-player__poster"
            />
          ) : (
            <video
              className="video-player__poster-video"
              src={src}
              preload="metadata"
              muted
              playsInline
            />
          )}
          <div className="video-player__play-button">
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
