import React from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
import Profile from "../../views/Supervisor/Profile/Profile";
import * as actionTypes from "../../Redux/Actions/action-types";
class supervisorProfile extends React.Component {
  render() {
    return (
      <div>
        <Profile profileUpdate={this.props.onUpdate} />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    //profile details here
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdate: data => {
      dispatch(
        actionCreators.setMyData(actionTypes.UPDATE_SUPERVISOR_PROFILE, data)
      );
    }
  };
};
supervisorProfile.propTypes = {
  onUpdate: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorProfile);
supervisorProfile.propTypes = {};
