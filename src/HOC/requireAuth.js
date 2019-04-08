import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
export default function requireAuth(ComposedComponent) {
  class Authentication extends React.Component {
    render() {
      const { authenticated, logged_in } = this.props;
      let isAuthenticated = JSON.parse(authenticated);
      if (logged_in && isAuthenticated === true) {
        return <ComposedComponent {...this.props} />;
      } else {
        this.props.history.push("/login");
      }
    }
  }
  const mapStateToProps = state => {
    return {
      admin: state.user.user,
      logged_in: typeof state.token.access_token === "string"
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      Token: localStorage.getItem("access_token"),
      authenticated: localStorage.getItem("isAuthenticated")
    };
  };
  Authentication.propTypes = {
    history: PropTypes.object,
    logged_in: PropTypes.bool,
    authenticated: PropTypes.func
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Authentication));
}
