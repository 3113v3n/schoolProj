import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import Profile from "../../views/Supervisor/Profile/Profile";
class supervisorProfile extends React.Component {
  render() {
    const { error, errorMessage, onUpdate, user, status, message } = this.props;
    return (
      <div>
        <Profile
          profileUpdate={onUpdate}
          user={user}
          error={error}
          errorMessage={errorMessage}
          status={status}
          message={message}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user, //emp_no
    error: state.error.error,
    status: state.supervisor.status,
    message: state.supervisor.message,
    errorMessage: state.error.errorMessage
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdate: data => {
      dispatch(actionCreators.editSupervisorProfile(data));
    }
  };
};
supervisorProfile.propTypes = {
  onUpdate: PropTypes.func,
  user: PropTypes.object,
  error: PropTypes.bool,
  status: PropTypes.string,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorProfile);
supervisorProfile.propTypes = {};
