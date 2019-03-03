import React from "react";
import LoginForm from "../../layouts/LoginForm.jsx";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";

class Login extends React.Component {
  render() {
    return (
      <div className="New-User">
        <LoginForm handleSubmit={this.props.onSubmit} />
        {this.props.userId}
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (staffId, password) =>
      dispatch({
        type: actionTypes.ADD_SUPERVISOR,
        userDetails: { staffId: staffId, password: password }
      })
  };
};
const mapStateToProps = state => {
  return {
    userId: state.staffId,
    userPass: state.password
  };
};
Login.propTypes = {
  onSubmit: PropTypes.func,
  userId: PropTypes.string,
  userPass: PropTypes.string,
  redirect: PropTypes.bool
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
