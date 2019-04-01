import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import Profile from "../../views/Supervisor/Profile/Profile";
class supervisorProfile extends React.Component {
  render() {
    const { error, errorMessage, onUpdate, user, profile } = this.props;
    return (
      <div>
        <Profile
          profileUpdate={onUpdate}
          user={user}
          error={error}
          errorMessage={errorMessage}
          profile={profile}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user, //emp_no
    error: state.error.error,
    profile: state.supervisor.supervisorDetails,
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
  errorMessage: PropTypes.string,
  profile: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorProfile);
supervisorProfile.propTypes = {};
