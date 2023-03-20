/* eslint-disable react/jsx-max-depth */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { moedasAPI, addExpensesAPI, editExpensesAction } from '../redux/actions';
import TableComponent from './Table';

const INITIAL_STATE = {
  id: 0,
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
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
        <Form
          className="container mx-sm-auto"
          style={ { margin: '5rem', alignItems: 'flex-end', maxWidth: '70%' } }
        >
          <Row className="mb-3">
            <Form.Group
              as={ Col }
            >
              <Form.Label>Valor da Despesa</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor"
                data-testid="value-input"
                onChange={ this.salvaState }
                name="value"
                value={ value }
              />
            </Form.Group>

            <Form.Group
              as={ Col }

            >
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite a descrição"
                data-testid="description-input"
                onChange={ this.salvaState }
                name="description"
                value={ description }
              />
            </Form.Group>

            <Form.Group
              as={ Col }

            >
              <Form.Label>Tag</Form.Label>
              <Form.Select
                data-testid="tag-input"
                name="tag"
                onChange={ this.salvaState }
              >
                <option className="loginColor"> Alimentação </option>
                <option className="loginColor"> Lazer </option>
                <option className="loginColor"> Trabalho </option>
                <option className="loginColor"> Transporte </option>
                <option className="loginColor"> Saúde </option>
              </Form.Select>
            </Form.Group>

            <Form.Group
              as={ Col }

            >
              <Form.Label>Moeda</Form.Label>
              <Form.Select
                data-testid="currency-input"
                name="currency"
                onChange={ this.salvaState }
              >
                {
                  currencies.map((option, index) => (
                    <option
                      className="loginColor"
                      key={ index }
                      name={ option }
                    >
                      { option }
                    </option>
                  ))
                }
              </Form.Select>
            </Form.Group>
            <Form.Group
              as={ Col }

            >
              <Form.Label>Forma de Pagamento</Form.Label>
              <Form.Select
                data-testid="method-input"
                name="method"
                onChange={ this.salvaState }
              >
                <option className="loginColor"> Dinheiro </option>
                <option className="loginColor"> Cartão de crédito </option>
                <option className="loginColor"> Cartão de débito</option>
              </Form.Select>
            </Form.Group>
            <Button
              as={ Col }
              onClick={ this.handleClick }
              data-testid="add-button"
              style={ { alignItems: 'flex-end', marginTop: '30px' } }
              className={ (editor ? 'editButton' : 'loginButton') }
            >
              { editor ? 'Editar despesa' : 'Adicionar despesa'}
            </Button>
          </Row>
        </Form>
        <section>
          <TableComponent />
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
