import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    // criar nova action disparada pelo click. Criar reducer para ela e nesse reducer fazer a logica da soma.
    return (
      <div>
        <h1>Minhas Despesas</h1>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{ (parseFloat(total).toFixed(2)) }</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.total,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
