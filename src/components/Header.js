import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = (props) => (
  <div>
    <h1>Expensify</h1>
    <p>
      <NavLink activeClassName="is-active" to="/dashboard" exact={true}>Go Home</NavLink> --
      <NavLink activeClassName="is-active" to="/create">Add</NavLink> --
      <button onClick={props.startLogout}>Logout</button>
    </p>
  </div>
);

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);