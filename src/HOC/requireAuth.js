import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

export default function requireAuth(ComposedComponent) {
  class Authentication extends React.Component{
    UNSAFE_componentWillMount() {
      if (!this.props.validToken) {
        this.props.history.push("/login");
      }
    }

    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.validToken) {
        this.props.history.push("/login");
      }
    }
    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  const mapStateToProps = state => {
    return{
      authenticated: state.user.token
    };
  };
  Authentication.propTypes = {
    validToken: PropTypes.string,
    history: PropTypes.object
}
  return connect(mapStateToProps)(withRouter(Authentication));
}
