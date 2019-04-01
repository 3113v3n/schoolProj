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
          alert("Expired");
        } else {
          console.log("Token is Still Active");
        }
      });
    }

    // UNSAFE_componentWillMount() {
    //   if (!this.props.authenticated) {
    //     this.props.history.push("/login");
    //   }
    // }
    //
    // UNSAFE_componentWillUpdate(nextProps) {
    //   if (!nextProps.authenticated) {
    //     this.props.history.push("/login");
    //   }
    // }
    render() {
      const Token = localStorage.getItem("access_Token");
      if (Token !== null) {
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
      refreshToken: () => dispatch(actionCreators.refreshToken())
    };
  };
  Authentication.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    validToken: PropTypes.string,
    history: PropTypes.object,
    refreshToken: PropTypes.func
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Authentication));
}
