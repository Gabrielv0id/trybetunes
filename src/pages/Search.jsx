import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    artist: '',
    isButtonDisable: true,
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

  render() {
    const { artist, isButtonDisable } = this.state;
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
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisable }
            >
              Pesquisar
            </button>
          </label>
        </form>
      </div>
    );
  }
}
