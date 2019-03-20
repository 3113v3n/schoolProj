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
        <Supervisor
          onSubmit={this.props.onSubmit}
          error={this.props.error}
          status={this.props.status}
        />
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
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.admin.status
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorContainer);
supervisorContainer.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string
};
