/**
 * VideoPlayer.jsx
 * HTML5 video component with controls and fallback text.
 * Required by the multimedia rubric section.
 *
 * Props:
 *  - videoUrl  : string (path or URL to .mp4)
 *  - title     : string (optional heading)
 *  - poster    : string (optional poster image)
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

/**
 * Pulls the 11-character video ID out of any common YouTube URL shape
 * (watch?v=, youtu.be/, shorts/, already-an-embed link, etc).
 * Returns null if `url` doesn't look like a YouTube link at all, which
 * is how we decide whether to render an <iframe> or a plain <video>.
 */
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const VideoPlayer = ({
  videoUrl = '',
  title = 'Cooking Tutorial',
  poster = '',
}) => {
  // If no video source is provided, show a friendly placeholder
  if (!videoUrl) {
    return (
      <div className={styles.mediaContainer}>
        <h3 className={styles.mediaTitle}>{title}</h3>
        <div className={styles.videoWrapper}>
          <div className={styles.videoFallback}>
            No tutorial video available for this recipe yet.
          </div>
        </div>
      </div>
    );
  }

  const youtubeId = getYouTubeVideoId(videoUrl);

  return (
    <div className={styles.mediaContainer}>
      <h3 className={styles.mediaTitle}>{title}</h3>
      <p className={styles.mediaSubtitle}>Watch the step-by-step tutorial</p>

      <div className={styles.videoWrapper}>
        {youtubeId ? (
          // YouTube links are pages, not video files, so a <video> tag
          // can never play them. An <iframe> pointed at YouTube's own
          // embed player is the only way to show them in the page.
          <iframe
            className={styles.iframeElement}
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          // Proper HTML5 video element with controls, for direct .mp4 links
          <video
            className={styles.videoElement}
            controls
            playsInline
            poster={poster || undefined}
            preload="metadata"
          >
            <source src={videoUrl} type="video/mp4" />
            {/* Fallback content for unsupported browsers */}
            <p className={styles.videoFallback}>
              Your browser does not support the video tag.
              <br />
              <a href={videoUrl} target="_blank" rel="noopener noreferrer">
                Download the tutorial video instead
              </a>
            </p>
          </video>
        )}
      </div>
    </div>
  );
};

VideoPlayer.propTypes = {
  videoUrl: PropTypes.string,
  title: PropTypes.string,
  poster: PropTypes.string,
};

export default VideoPlayer;