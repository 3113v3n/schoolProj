import React from "react";
import Supervisor from "../../views/Forms/Supervisors/Supervisor.jsx";
import * as actionTypes from "../../Redux/Actions/action-types";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class supervisorContainer extends React.Component {
  render() {
    return (
      <div>
        <Supervisor onSubmit={this.props.onSubmit} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (
      staffId,
      email,
      firstName,
      lastName,
      password,
      confirmPass,
      selected
    ) =>
      dispatch({
        type: actionTypes.ADD_SUPERVISOR,
        supervisorDetails: {
          staffId: staffId,
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password,
          confirmPass: confirmPass,
          courseSelected: selected
        }
      })
  };
};
export default connect(
  null,
  mapDispatchToProps
)(supervisorContainer);
supervisorContainer.propTypes = {
  onSubmit: PropTypes.func
};
