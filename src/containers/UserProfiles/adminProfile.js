import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import UserProfile from "../../views/UserProfile/UserProfile.jsx";
class adminProfile extends React.Component {
  render() {
    return (
      <div>
        <UserProfile updateProfile={this.props.updateProfile} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //profile details go here
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateProfile: adminDetails => {
      dispatch(actionCreators.updateAdminProfile(adminDetails));
    }
  };
};
adminProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProfile);
