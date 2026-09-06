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

  return (
    <div className={styles.mediaContainer}>
      <h3 className={styles.mediaTitle}>{title}</h3>
      <p className={styles.mediaSubtitle}>Watch the step-by-step tutorial</p>

      <div className={styles.videoWrapper}>
        {/* Proper HTML5 video element with controls */}
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
