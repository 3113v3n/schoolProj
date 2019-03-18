import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import UserProfile from "../../views/UserProfile/UserProfile.jsx";
import * as actionTypes from "../../Redux/Actions/action-types";
class adminProfile extends React.Component {
  render() {
    const { updateProfile, user } = this.props;
    return (
      <div>
        <UserProfile
          updateProfile={updateProfile}
          user={user}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.admin.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateProfile: data => {
      dispatch(
        actionCreators.setMyData(actionTypes.UPDATE_ADMIN_PROFILE, data)
      );
    }
  };
};
adminProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.object,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProfile);
