import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import UserProfile from "../../views/UserProfile/UserProfile.jsx";
import * as actionTypes from "../../Redux/Actions/action-types";
class adminProfile extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <UserProfile
          updateProfile={this.props.updateProfile}

        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //profile details go here
    user: state.user.profile
  };
};
const mapDispatchToProps = dispatch => {
  return {
    updateProfile: data => {
      dispatch(
        actionCreators.setMyData(actionTypes.UPDATE_ADMIN_PROFILE, data)
      );
    },
    fetchData: () => {
      dispatch(actionCreators.fetchUser());
    }
  };
};
adminProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  fetchData: PropTypes.func.isRequired,
  user: PropTypes.object
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(adminProfile);
