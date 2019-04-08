import React from "react";
import LoginForm from "../../layouts/LoginForm.jsx";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class Login extends React.Component {
  render() {
    const getRole = localStorage.getItem("role");
    return (
      <div className="New-User">
        <LoginForm
          handleSubmit={this.props.onSubmit}
          error={this.props.error}
          isAuthenticated={this.props.isAuthenticated}
          errorMessage={this.props.errorMessage}
          role={getRole}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (id, pass) => dispatch(actionCreators.LoggedIn(id, pass))
  };
};
const mapStateToProps = state => {
  return {
    redirect: state.user.redirect,
    error: state.error.error,
    isAuthenticated: state.user.isAuthenticated,
    errorMessage: state.error.errorMessage
  };
};
Login.propTypes = {
  dispatch: PropTypes.func,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string,
  onSubmit: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
