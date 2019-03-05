import React from "react";
import Supervisor from "../../views/Forms/Supervisors/Supervisor.jsx";
import * as actionCreators from "../../Redux/Actions/";
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
    onSubmit: supervisorDetails =>
      dispatch(actionCreators.addSupervisor(supervisorDetails))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(supervisorContainer);
supervisorContainer.propTypes = {
  onSubmit: PropTypes.func
};
