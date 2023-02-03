import React, { Component } from 'react';

class Table extends Component {
  render() {
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
            <tr>
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}

export default Table;
