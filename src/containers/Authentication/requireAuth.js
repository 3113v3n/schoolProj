import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { addFlashMessage } from "../../Redux/Actions";
export default function(ComposedComponent) {
  class Authenticate extends React.Component {
    UNSAFE_componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.props.addFlashMessage({
          type: "error",
          text: "you need to login to access the page"
        });
        return <Redirect to="/login" />;
      }
    }
    UNSAFE_componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        return <Redirect to="/login" />;
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }
  Authenticate.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    addFlashMessage: PropTypes.func.isRequired
  };
  const mapStateToProps = state => {
    return {
      isAuthenticated: state.user.isAuthenticated
    };
  };
  const mapDispatchToProps = dispatch => {
    return {
      addFlashMessage: message => dispatch(addFlashMessage(message))
    };
  };
  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(Authenticate);
}
