import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {isTokenExpired} from "../services/requests";

export default function requireAuth(ComposedComponent) {
  class Authentication extends React.Component {
    // componentDidMount() {
    //   if (isTokenExpired()) {
    //     alert("Token Expired, request for new");
    //   }
    // }

    UNSAFE_componentWillMount() {
      if (!this.props.authenticated) {
        this.props.history.push("/login");
      }
    }

    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => {
    return {
      authenticated: state.user.isAuthenticated,
      Token: state.user.token,
      admin: state.user.user
    };
  };
  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    validToken: PropTypes.string,
    history: PropTypes.object
  };
  return connect(mapStateToProps)(withRouter(Authentication));
}
