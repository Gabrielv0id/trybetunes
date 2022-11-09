import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../components/Carregando';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

export default class Profile extends Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.getUserFetch();
  }

  getUserFetch = async () => {
    this.setState({ isLoading: true });
    const user = await getUser();
    this.setState({ isLoading: false, user });
  };

  render() {
    const { isLoading, user } = this.state;
    const { name, email, image, description } = user;
    return (
      <div data-testid="page-profile">
        <Header />
        { isLoading ? (<Carregando />) : (
          <div>
            <img src={ image } alt="foto do perfil" data-testid="profile-image" />
            <Link to="/profile/edit"> Editar perfil</Link>
            <div>
              <h2>Nome</h2>
              <p>{name}</p>
            </div>
            <div>
              <h2>Email</h2>
              <p>{email}</p>
            </div>
            <div>
              <h2>Descrição</h2>
              <p>{description}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}
