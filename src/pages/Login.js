import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';

class Login extends Component {
  state = {
    email: '',
    emailValido: false,
    senhaValida: false,
  };

  validaEmail = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.setState({
      emailValido: false,
    });
    if (regexEmail.test(value)) {
      this.setState({
        email: value,
        emailValido: true,
      });
    }
  };

  validaSenha = (event) => {
    event.preventDefault();
    const { value } = event.target;
    const regexSenha = /^[^\W_]{6}$/g;
    this.setState({
      senhaValida: false,
    });
    if (regexSenha.test(value)) {
      this.setState({
        senhaValida: true,
      });
    }
  };

  clickBtn = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(loginAction(email));
    history.push('/carteira');
  };

  render() {
    const { emailValido, senhaValida } = this.state;

    return (
      <div>
        <h1>Faça o seu login</h1>
        <input
          label="Email: "
          type="email"
          data-testid="email-input"
          onChange={ this.validaEmail }
          placeholder="Digite um email válido"
        />
        <input
          label="Senha: "
          type="password"
          data-testid="password-input"
          onChange={ this.validaSenha }
          placeholder="Digite a sua senha"
        />
        {/* {senha === false && <p>A senha deve ter no mínimo 8 caracteres, sendo no mínimo 1 letra</p>} */}
        <button
          type="submit"
          id="btn"
          disabled={ (emailValido && senhaValida) ? null : 'disabled' }
          onClick={ this.clickBtn }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
