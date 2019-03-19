import React from "react";
import Supervisor from "../../views/Forms/Supervisors/Supervisor.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionTypes from "../../Redux/Actions/action-types";
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
    // onSubmit: data =>
    // dispatch(actionCreators.setMyData(actionTypes.ADD_SUPERVISOR, data))
    onSubmit: data => dispatch(actionCreators.addSupervisor(data))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(supervisorContainer);
supervisorContainer.propTypes = {
  onSubmit: PropTypes.func
};
