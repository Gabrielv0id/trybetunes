import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  render() {
    const {
      trackNames,
      previewUrls,
      trackId,
      onChangeValue,
      music,
      check,
    } = this.props;
    return (
      <li>
        <p>{trackNames}</p>
        <audio data-testid="audio-component" src={ previewUrls } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
        </audio>
        <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
          Favorita
          <input
            type="checkbox"
            name="favorite"
            id={ trackId }
            onChange={ ({ target }) => onChangeValue(music, target.checked) }
            checked={ check }
          />
        </label>
      </li>
    );
  }
}

MusicCard.propTypes = {
  music: PropTypes.object,
  trackNames: PropTypes.array,
  previewUrls: PropTypes.string,
  trackId: PropTypes.string,
}.isRequired;
