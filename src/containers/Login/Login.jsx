import React from "react";
import LoginForm from "../../layouts/LoginForm.jsx";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { ADD_SUPERVISOR } from "../../Redux/Actions/action-types";
import PropTypes from "prop-types";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      staffId: "",
      password: "",
      redirect: false
    };
  }
  handleInput(event) {
    this.setState({ [event.target.id]: event.target.value });
  }
  handleSubmit() {
    const{staffId, password,redirect} =this.state;
    this.props.onSubmit(staffId, password, redirect);
    this.setState({ staffId: "", password: "" });
  }
  render() {
    //const { redirect } = this.props;
    if (this.props.redirect === true) {
      return <Redirect to="/admin/dashboard" />;
    }
    return (
      <div>
        <LoginForm
          handleInput={ this.handleInput}
          handleSubmit={this.handleSubmit}
          staffId={this.props.userId}
          password={this.props.userPass}
        />
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSubmit: () => dispatch({ type: ADD_SUPERVISOR })
  };
};
const mapStateToProps = state => {
  return {
    userId: state.user.staffId,
    userPass: state.user.password,
    redirect: state.redirect
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
  mapDispatchToProps()
)(Login);
