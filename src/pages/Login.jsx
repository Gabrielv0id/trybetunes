import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Carregando from '../components/Carregando';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    isLoading: false,
    isButtonDisable: true,
    nome: '',
  };

  // fetchApi = async () => {
  //   const response = await createUser();
  //   const data = await response.json();
  //   this.setState(
  //     {
  //       isLoading: false,
  //     },
  //   );
  // };

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
    const { nome } = this.state;
    const minimum = 3;
    const isValid = nome.length < minimum;
    this.setState(
      {
        isButtonDisable: isValid,
      },
    );
  };

  onButtonClick = async () => {
    const { history } = this.props;
    const { nome } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: nome });
    history.push('/search');
  };

  render() {
    const { isButtonDisable, nome, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              name="nome"
              data-testid="login-name-input"
              value={ nome }
              onChange={ this.onInputChange }
            />
            <button
              type="button"
              disabled={ isButtonDisable }
              data-testid="login-submit-button"
              onClick={ this.onButtonClick }
            >
              Entrar
            </button>
          </label>
        </form>
        { isLoading && <Carregando />}
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
