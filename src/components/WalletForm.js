import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moedasAPI, addExpensesAPI, editExpensesAction } from '../redux/actions';
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
    const { dispatch, editor, idToEdit, expenses } = this.props;
    const { value, description, method, tag, currency } = this.state;
    if (editor) {
      const editExpenses = expenses.find((gasto) => gasto.id === Number(idToEdit));
      const noEditExpenses = expenses.filter((gasto) => gasto.id !== Number(idToEdit));
      editExpenses.value = value;
      editExpenses.description = description;
      editExpenses.currency = currency;
      editExpenses.method = method;
      editExpenses.tag = tag;
      const newExpenses = [editExpenses, ...noEditExpenses];
      const total = [];
      newExpenses.map((newGastos) => {
        const code = Object.values(newGastos.exchangeRates);
        const moedaEdit = code.find((sigla) => (sigla.code === newGastos.currency));
        const totalEdit = newGastos.value * moedaEdit.ask; // valor de cada despesa após o edit
        return total.push(totalEdit);
      });
      const newTotal = total.reduce((initialValue, crr) => initialValue + crr);
      dispatch(editExpensesAction(newExpenses, newTotal));
      this.setState({
        value: '',
        description: '',
      });
    } else {
      this.setState((prevState) => ({
        ...INITIAL_STATE,
        id: prevState.id + 1,
      }));
      dispatch(addExpensesAPI({ ...this.state }));
      this.setState({
        value: '',
        description: '',
      });
    }
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description } = this.state;
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
                <option key={ index } name={ option }>{ option }</option>
              ))
            }
          </select>

          <select
            label="Forma de Pagamento: "
            data-testid="method-input"
            name="method"
            onChange={ this.salvaState }
          >
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito</option>
          </select>

          <select
            label="Categoria: "
            data-testid="tag-input"
            name="tag"
            onChange={ this.salvaState }
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
            { editor ? 'Editar despesa' : 'Adicionar despesa'}

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
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  expenses: state.wallet.expenses,
});

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
