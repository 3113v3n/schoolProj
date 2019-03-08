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
          redirect={this.props.redirect}
          addFlashMessage={this.props.addFlashMessage}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data =>
      dispatch(actionCreators.setMyData(actionTypes.SET_CURRENT_USER, data)), //Redux storage
    // onSubmit: data => dispatch(actionCreators.AddNewUser(data)) // add to server
    addFlashMessage: message =>
      dispatch(actionCreators.addFlashMessage(message))
  };
};
const mapStateToProps = state => {
  return {
    redirect: state.user.redirect
  };
};
Login.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  userId: PropTypes.string,
  userPass: PropTypes.string,
  redirect: PropTypes.bool,
  addFlashMessage: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
