import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import UserProfile from "../../views/UserProfile/UserProfile.jsx";;
class adminProfile extends React.Component {
  render() {
    const { updateProfile, user, error, errorMessage, message } = this.props;
    return (
      <div>
        <UserProfile
          updateProfile={updateProfile}
          user={user}
          error={error}
          errorMessage={errorMessage}
          message={message}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user.user,
    error: state.error.error,
    errorMessage: state.error.errorMessage,
    message: state.admin.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateProfile: data => {
      dispatch(actionCreators.editAdminProfile(data));
    }
  };
};
adminProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProfile);
