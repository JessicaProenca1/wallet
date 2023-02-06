import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moedasAPI, addExpensesAPI } from '../redux/actions';
import Table from './Table';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: '',
  method: '',
  tag: '',
};

class WalletForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(moedasAPI());
  }

  salvaState = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleClick = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    this.setState((prevState) => ({
      ...INITIAL_STATE,
      id: prevState.id + 1,
    }));
    dispatch(addExpensesAPI({ ...this.state }));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    // if (isFetchingMoedas) return <p>Carregando Carteira</p>;
    return (
      <div>
        <form>
          <input
            label="Valor: "
            type="number"
            data-testid="value-input"
            onChange={ this.salvaState }
            placeholder="Digite o valor"
            name="value"
            value={ value }
          />

          <input
            label="Descricao: "
            type="text"
            data-testid="description-input"
            onChange={ this.salvaState }
            placeholder="Digite a descrição da despesa"
            name="description"
            value={ description }
          />

          <select
            label="Moeda: "
            data-testid="currency-input"
            name="currency"
            onBlur={ this.salvaState }
          >
            Moeda:
            {
              currencies.map((option, index) => (
                <option key={ index } value={ option }>{ option }</option>
              ))
            }
          </select>

          <select
            label="Forma de Pagamento: "
            data-testid="method-input"
            name="method"
            onBlur={ this.salvaState }
          >
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito</option>
          </select>

          <select
            label="Categoria: "
            data-testid="tag-input"
            name="tag"
            onBlur={ this.salvaState }
          >
            <option> Alimentação </option>
            <option> Lazer </option>
            <option> Trabalho </option>
            <option> Transporte </option>
            <option> Saúde </option>
          </select>
          <button
            onClick={ this.handleClick }
            data-testid="add-button"
          >
            Adicionar despesa

          </button>
        </form>
        <section>
          <Table />
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchingMoedas: state.wallet.isFetchingMoedas,
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  // isFetchingMoedas: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
