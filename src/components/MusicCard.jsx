import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from './Carregando';
import { addSong } from '../services/favoriteSongsAPI';

export default class MusicCard extends Component {
  state = {
    isLoading: false,
  };

  onChangeValue = async ({ target }) => {
    const { checked } = target;
    const { music } = this.props;
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(music);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { trackNames, previewUrls, trackId } = this.props;
    const { isLoading } = this.state;
    return (
      <li>
        {isLoading && <Carregando />}
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
            onChange={ this.onChangeValue }
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
