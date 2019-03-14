import React from "react";
import LoginForm from "../../layouts/LoginForm.jsx";
import { connect } from "react-redux";
import * as actionTypes from "../../Redux/Actions/action-types";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class Login extends React.Component {
  render() {
    return (
      <div className="New-User">
        <LoginForm
          handleSubmit={this.props.onSubmit}
          error={this.props.error}
          isAuthenticated={this.props.isAuthenticated}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data =>
      dispatch(actionCreators.setMyData(actionTypes.SET_CURRENT_USER, data)) //Redux storage
    // onSubmit: data => dispatch(actionCreators.LogMeIn(data)) // add to server
  };
};
const mapStateToProps = state => {
  return {
    redirect: state.user.redirect,
    error: state.error.error,
    isAuthenticated: state.user.isAuthenticated,
    errorMessage: state.user.errorMessage
  };
};
Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  errorMessage: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
