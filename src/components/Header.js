import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListGroup from 'react-bootstrap/ListGroup';

class Header extends Component {
  render() {
    const { email, total } = this.props;
    return (
      <ListGroup
        horizontal
        variant="flush"
        className="container mx-sm-auto"
        style={ { margin: '5rem', justifyContent: 'center', alignItems: 'stretch' } }
      >
        <ListGroup.Item
          className="display-4 loginColor"
        >
          Minhas Despesas
        </ListGroup.Item>
        <ListGroup.Item
          className="display-7 loginColor"
          data-testid="email-field"
          style={ { display: 'flex', alignItems: 'center' } }
        >
          { email }

        </ListGroup.Item>
        <ListGroup.Item
          className="display-7 loginColor"
          data-testid="total-field"
          style={ { display: 'flex', alignItems: 'center', flexWrap: 'nowrap' } }
        >
          { `Total dos gastos: R$ ${(parseFloat(total).toFixed(2))}` }
        </ListGroup.Item>
      </ListGroup>
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
