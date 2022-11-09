import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

export default class Album extends Component {
  state = {
    card: [],
    artistName: '',
    albumName: '',
  };

  componentDidMount() {
    this.fetchAlbumMusics();
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

  render() {
    const { card, artistName, albumName } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="album-name">{`Collection Name ${albumName}`}</h2>
          <h3 data-testid="artist-name">{`Artist Name ${artistName}`}</h3>
          <ul>
            {card.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackNames={ music.trackName }
                previewUrls={ music.previewUrl }
                trackId={ music.trackId }
                music={ music }
              />
            ))}
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
