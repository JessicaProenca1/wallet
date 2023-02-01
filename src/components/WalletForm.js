import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { moedasAPI } from '../redux/actions';

class WalletForm extends Component {
  // state = {
  //   currency: [],
  //   expenses: [{
  //     value: '',
  //     description: '',
  //     moeda: '',
  //     pg: '',
  //     category: '',
  //   },
  //   ],
  // };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(moedasAPI());
  }

  render() {
    const { isFetchingMoedas, currencies } = this.props;
    if (isFetchingMoedas) return <p>Carregando Carteira</p>;
    return (
      <div>
        <form>
          <input
            label="Valor: "
            type="number"
            data-testid="value-input"
            // onChange={this.mudaState}
            placeholder="Digite o valor"
            required
          />

          <input
            label="descricao"
            type="text"
            data-testid="description-input"
            // onChange={ }
            placeholder="Digite a descrição da despesa"
            required
          />

          <select label="Moeda: " data-testid="currency-input">
            {
              Object.values(currencies).map((option, index) => (
                <option key={ index }>{ option }</option>
              ))
            }
          </select>

          <select label="Forma de Pagamento: " data-testid="method-input" required>
            <option> Dinheiro </option>
            <option> Cartão de crédito </option>
            <option> Cartão de débito</option>
          </select>

          <select label="Categoria: " data-testid="tag-input" required>
            <option> Alimentação </option>
            <option> Lazer </option>
            <option> Trabalho </option>
            <option> Transporte </option>
            <option> Saúde </option>
          </select>
          <button onClick={ () => dispatch(moedasAPI()) }>Salvar Despesa</button>
        </form>
        {/* <section>
          <h2>Tabela de Despesas</h2>
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Pagamento</th>
                <th>Moeda</th>
                <th>Câmbio</th>
                <th>Valor Convertido</th>
                <th>Moeda de Conversão</th>
                <th>Tag</th>
                <th>Excluir</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td>{descricaoSalva}</td>
                <td>{valorSalvo}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </section> */}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFetchingMoedas: state.wallet.isFetchingMoedas,
  currencies: state.wallet.currencies,

});

WalletForm.propTypes = {
  isFetchingMoedas: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
