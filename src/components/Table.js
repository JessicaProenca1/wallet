import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
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
            {expenses.map((gasto, index) => {
              const code = Object.values(gasto.exchangeRates);
              const moeda = code.find((sigla) => (sigla.code === gasto.currency));
              return (
                <tr key={ index }>
                  <td>{parseFloat(gasto.value).toFixed(2)}</td>
                  <td>{gasto.description}</td>
                  <td>{gasto.method}</td>
                  <td>{ moeda.name }</td>
                  <td>{parseFloat(moeda.ask).toFixed(2)}</td>
                  <td>{parseFloat(moeda.ask * gasto.value).toFixed(2)}</td>
                  <td>Real</td>
                  <td>{gasto.tag}</td>
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
};

export default connect(mapStateToProps)(Table);
