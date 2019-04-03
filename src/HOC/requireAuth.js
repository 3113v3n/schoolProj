import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { isTokenExpired } from "../services/requests";
import * as actionCreators from "../Redux/Actions";
export default function requireAuth(ComposedComponent) {
  class Authentication extends React.Component {
    UNSAFE_componentWillMount() {
      isTokenExpired().then(res => {
        if (res === true) {
          this.props.refreshToken();
        } else {
          console.log("Token is Still Active");
        }
      });
    }
    render() {
      const { authenticated, Token } = this.props;
      if (Token !== null && authenticated === "True") {
        return <ComposedComponent {...this.props} />;
      } else {
        this.props.history.push("/login");
      }
    }
  }
  const mapStateToProps = state => {
    return {
      authenticated: state.user.isAuthenticated,
      admin: state.user.user
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      refreshToken: () => dispatch(actionCreators.refreshToken()),
      authenticated: localStorage.getItem("isAuthenticated"),
      Token: localStorage.getItem("access_Token")
    };
  };
  Authentication.propTypes = {
    authenticated: PropTypes.func,
    history: PropTypes.object,
    refreshToken: PropTypes.func,
    Token: PropTypes.func
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Authentication));
}
