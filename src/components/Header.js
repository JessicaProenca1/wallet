import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, value } = this.props;
    return (
      <div>
        <h1>Minhas Despesas</h1>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">{value}</h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  value: state.wallet.value,

});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Header);
