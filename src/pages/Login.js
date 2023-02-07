import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { loginAction } from '../redux/actions';
import '../App.css';
import wallet from '../wallet.png';

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
      <CardGroup
        className="container mx-sm-auto"
        style={ { margin: '5rem', justifyContent: 'center' } }
      >
        <Card.Img
          alt="carteira"
          src={ wallet }
          style={ { width: '18rem', marginTop: '250px' } }
        />
        <Card
          style={ { width: '18rem', maxWidth: '18rem', marginTop: '250px' } }
          className="loginColor bg-opacity-75"
        >
          <Form className="form-control-lg mb-7 loginColor">
            <Form.Group className="loginColor">
              <Card.Title
                className="my-4 fs-3 text-center text-dark loginColor"
              >
                Faça o seu login
              </Card.Title>
              <Form.Control
                className="mb-4"
                label="Email: "
                type="email"
                data-testid="email-input"
                onChange={ this.validaEmail }
                placeholder="Digite um email válido"
              />
              <Form.Control
                className="mb-4"
                label="Senha: "
                type="password"
                data-testid="password-input"
                onChange={ this.validaSenha }
                placeholder="Digite a sua senha"
              />
              <Button
                className="mb-4 loginButton"
                type="submit"
                id="btn"
                disabled={ (emailValido && senhaValida) ? null : 'disabled' }
                onClick={ this.clickBtn }
              >
                Entrar
              </Button>
            </Form.Group>
          </Form>
        </Card>
      </CardGroup>
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
