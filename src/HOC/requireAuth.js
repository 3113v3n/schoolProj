import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { isTokenExpired } from "../services/requests";
import * as actionCreators from "../Redux/Actions";
export default function requireAuth(ComposedComponent) {
  class Authentication extends React.Component {
    componentDidMount() {
      isTokenExpired().then(res => {
        if (res === true) {
          this.props.refreshToken();
        }
      });
    }
    render() {
      const { authenticated, Token } = this.props;
      let isAuthenticated = JSON.parse(authenticated);
      if (Token !== null && Token !== undefined && isAuthenticated) {
        return <ComposedComponent {...this.props} />;
      } else {
        this.props.history.push("/login");
      }
    }
  }
  const mapStateToProps = state => {
    return {
      admin: state.user.user
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      refreshToken: () => dispatch(actionCreators.refreshToken()),
      Token: localStorage.getItem("access_Token"),
      authenticated: localStorage.getItem("isAuthenticated")
    };
  };
  Authentication.propTypes = {
    history: PropTypes.object,
    refreshToken: PropTypes.func,
    Token: PropTypes.func,
    authenticated: PropTypes.func
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Authentication));
}
