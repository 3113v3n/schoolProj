import React from "react";
import LoginForm from "../../layouts/LoginForm.jsx";
import { connect } from "react-redux";

import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";

class Login extends React.Component {
  render() {
    return (
      <div className="New-User">
        <LoginForm
          handleSubmit={this.props.onSubmit}
          redirect={this.props.redirect}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: userDetails => dispatch(actionCreators.newUser(userDetails))
  };
};
const mapStateToProps = state => {
  return {
    userId: state.user.staffId,
    userPass: state.user.password,
    redirect: state.user.redirect
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
