import React from "react";
import Supervisor from "../../views/Forms/Supervisors/Supervisor.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class supervisorContainer extends React.Component {
  render() {
    return (
      <div>
        <Supervisor
          onSubmit={this.props.onSubmit}
          error={this.props.error}
          status={this.props.status}
          message={this.props.message}
          errorMessage={this.props.errorMessage}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: data => dispatch(actionCreators.addSupervisor(data))
  };
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.admin.status,
    message: state.admin.message,
    errorMessage: state.admin.errorMessage
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(supervisorContainer);
supervisorContainer.propTypes = {
  onSubmit: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string,
  message: PropTypes.string,
  errorMessage: PropTypes.string
};
