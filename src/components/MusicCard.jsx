import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const { trackNames, previewUrls } = this.props;
    return (
      <li>
        <p>{trackNames}</p>
        <audio data-testid="audio-component" src={ previewUrls } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
      </li>
    );
  }
}

MusicCard.propTypes = {
  trackNames: PropTypes.string.isRequired,
  previewUrls: PropTypes.string.isRequired,
};
