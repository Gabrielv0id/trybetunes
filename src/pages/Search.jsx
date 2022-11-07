import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    artist: '',
    nameArtist: '',
    isButtonDisable: true,
    isLoading: false,
    isButtonClicked: false,
    albums: [],
  };

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.valideButton();
      },
    );
  };

  valideButton = () => {
    const { artist } = this.state;
    const minimum = 2;
    const isValid = artist.length < minimum;
    this.setState(
      {
        isButtonDisable: isValid,
      },
    );
  };

  onButtonClick = async (event) => {
    const { artist } = this.state;
    event.preventDefault();
    this.setState({ isLoading: true });
    const response = await searchAlbumsAPI(artist);
    this.setState({
      nameArtist: artist,
      albums: response,
      isLoading: false,
      isButtonClicked: true,
      artist: '',
    });
  };

  render() {
    const {
      artist,
      isButtonDisable,
      isLoading,
      isButtonClicked,
      albums,
      nameArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="name">
            <input
              type="text"
              name="artist"
              id="name"
              data-testid="search-artist-input"
              value={ artist }
              onChange={ this.onInputChange }
            />
            <button
              type="submit"
              data-testid="search-artist-button"
              disabled={ isButtonDisable }
              onClick={ this.onButtonClick }
            >
              Pesquisar
            </button>
          </label>
        </form>
        {isLoading && <Carregando />}
        {(isButtonClicked && albums.length > 0)
         && (
           <>
             <h2>{`Resultado de álbuns de: ${nameArtist} `}</h2>
             <ul>
               {albums.map((album) => (
                 <li key={ album.collectionId }>
                   <Link
                     to={ `/album/${album.collectionId}` }
                     data-testid={ `link-to-album-${album.collectionId}` }
                   >
                     <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                   </Link>
                   <h4>{album.collectionName}</h4>
                   <p>{album.artistName}</p>
                 </li>))}
             </ul>
           </>
         )}
        {(isButtonClicked && albums.length === 0)
          && (
            <>
              <h2>{`Resultado de álbuns de: ${nameArtist} `}</h2>
              <h3>Nenhum álbum foi encontrado</h3>
            </>)}
      </div>
    );
  }
}
