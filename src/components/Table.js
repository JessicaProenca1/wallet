import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletar, edit } from '../redux/actions';

class Table extends Component {
  deletarTable = (event) => {
    event.preventDefault();
    const { id } = event.target;
    const { dispatch, expenses } = this.props;
    const newexpenses = expenses.filter((gasto) => gasto.id !== Number(id));
    const despesaDeletada = expenses.find((gasto) => gasto.id === Number(id));
    const api = Object.values(despesaDeletada.exchangeRates);
    const apiDeletada = api.find((sigla) => (sigla.code === despesaDeletada.currency));
    const totalDeletado = despesaDeletada.value * apiDeletada.ask;
    dispatch(deletar(newexpenses, totalDeletado));
  };

  editTable = (event) => {
    event.preventDefault();
    const { id } = event.target;
    const { dispatch, expenses } = this.props;
    const editExpenses = expenses.find((gasto) => gasto.id === Number(id));
    const idEdit = editExpenses.id;
    dispatch(edit(idEdit));
  };

  render() {
    const { expenses } = this.props;

    return (
      <section>
        <h2>Tabela de Despesas</h2>
        <table>
          <thead>
            <tr>
              <th>Valor</th>
              <th>Descrição</th>
              <th>Método de pagamento</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Tag</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((gasto) => {
              const code = Object.values(gasto.exchangeRates);
              const moeda = code.find((sigla) => (sigla.code === gasto.currency));
              return (
                <tr key={ gasto.id }>
                  <td data-testid="value-table">{parseFloat(gasto.value).toFixed(2)}</td>
                  <td data-testid="description-table">{gasto.description}</td>
                  <td data-testid="method-table">{gasto.method}</td>
                  <td data-testid="name-table">{ moeda.name }</td>
                  <td data-testid="ask-table">{parseFloat(moeda.ask).toFixed(2)}</td>
                  <td>{parseFloat(moeda.ask * gasto.value).toFixed(2)}</td>
                  <td>Real</td>
                  <td data-testid="tag-table">{gasto.tag}</td>
                  <td>
                    <button
                      data-testid="delete-btn"
                      id={ gasto.id }
                      onClick={ this.deletarTable }
                    >
                      Deletar

                    </button>
                    <button
                      data-testid="edit-btn"
                      id={ gasto.id }
                      onClick={ this.editTable }
                    >
                      Editar despesa

                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.objectOf).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
