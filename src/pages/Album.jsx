import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../components/Carregando';

export default class Album extends Component {
  state = {
    card: [],
    artistName: '',
    albumName: '',
    favoriteList: [],
    isLoading: false,
  };

  componentDidMount() {
    this.fetchAlbumMusics();
  }

  componentDidUpdate() {
    this.getFavoriteMusics();
  }

  Card = (musicsList, array) => {
    musicsList.forEach((track, index) => {
      if (index !== 0) {
        array.push(track);
      }
    });
  };

  fetchAlbumMusics = async () => {
    const { match } = this.props;
    const { id } = match.params;
    // const { history: { location:{ pathname } } } = this.props;
    // const pathNumber = pathname.split('/')[2];
    const musicsList = await getMusics(id);
    const { artistName, collectionName } = musicsList[1];
    const card = [];
    this.Card(musicsList, card);
    this.setState({
      card,
      artistName,
      albumName: collectionName,
    });
  };

  getFavoriteMusics = async () => {
    const favoriteList = await getFavoriteSongs();
    this.setState({
      favoriteList,
    });
  };

  onChangeValue = async (music, checked) => {
    this.setState({ isLoading: true });
    if (checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({ isLoading: false });
  };

  render() {
    const { card, artistName, albumName, favoriteList, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{`Collection Name: ${albumName}`}</h2>
          <h3 data-testid="artist-name">{`Artist Name: ${artistName}`}</h3>
          <ul>
            {isLoading ? <Carregando /> : (
              card.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  trackNames={ music.trackName }
                  previewUrls={ music.previewUrl }
                  trackId={ music.trackId }
                  music={ music }
                  check={ favoriteList
                    .some((favoriteMusic) => (favoriteMusic.trackId === music.trackId)) }
                  onChangeValue={ this.onChangeValue }
                />
              ))
            )}
          </ul>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};
