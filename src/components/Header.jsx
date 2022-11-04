import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

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
        {
          isLoading ? (
            <h1 data-testid="header-user-name">{name}</h1>
          ) : (
            <Carregando />
          )
        }
      </header>
    );
  }
}
