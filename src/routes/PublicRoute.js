import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const PublicRoute = ({component: Component, authenticated, ...rest}) =>(
    <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);

PublicRoute.propTypes = {
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps)(PublicRoute);