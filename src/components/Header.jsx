import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  state = {
    name: '',
    isLoading: false,
  };

  componentDidMount() {
    getUser().then(({ name }) => this.setState({
      name,
      isLoading: true,
    }));
  }

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading ? (
          <h1 data-testid="header-user-name">{name}</h1>
        ) : (
          <Carregando />
        )}
        <ul>
          <Link to="/search" data-testid="link-to-search"> Search</Link>
          <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
          <Link to="/profile" data-testid="link-to-profile">Profile</Link>
        </ul>
      </header>
    );
  }
}
