/**
 * AudioPlayer.jsx
 * HTML5 audio component with controls and fallback text.
 * Required by the multimedia rubric section.
 *
 * Props:
 *  - audioUrl  : string (path or URL to audio file)
 *  - title     : string
 *  - tip       : string (optional chef tip shown below the player)
 */

import React from 'react';
import PropTypes from 'prop-types';
import styles from './Media.module.css';

const AudioPlayer = ({
  audioUrl = '',
  title = 'Chef Tips Audio Guide',
  tip = '',
}) => {
  return (
    <div className={styles.mediaContainer}>
      <h3 className={styles.mediaTitle}>{title}</h3>
      <p className={styles.mediaSubtitle}>Listen while you cook</p>

      <div className={styles.audioWrapper}>
        {audioUrl ? (
          /* Proper HTML5 audio element with controls */
          <audio className={styles.audioElement} controls preload="metadata">
            <source src={audioUrl} type="audio/mpeg" />
            {/* Fallback for unsupported browsers */}
            <p className={styles.audioFallback}>
              Your browser does not support the audio element.
              <br />
              <a href={audioUrl} target="_blank" rel="noopener noreferrer">
                Download the audio guide instead
              </a>
            </p>
          </audio>
        ) : (
          <p className={styles.audioFallback}>
            No audio guide available for this recipe yet.
          </p>
        )}

        {/* Optional chef tip */}
        {tip && (
          <div className={styles.tipBox}>
            <span className={styles.tipLabel}>Tip:</span>
            {tip}
          </div>
        )}
      </div>
    </div>
  );
};

AudioPlayer.propTypes = {
  audioUrl: PropTypes.string,
  title: PropTypes.string,
  tip: PropTypes.string,
};

export default AudioPlayer;
