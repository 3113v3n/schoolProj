import React from "react";
import EditAllocation from "../../views/Allocation/EditTable/EditAllocation";
import { connect } from "react-redux";
import * as actionCreators from "../../Redux/Actions";
import PropTypes from "prop-types";
class EditAllocations extends React.Component {
  componentDidMount() {
    this.props.SupervisorsFetch();
  }

  render() {
    return (
      <div>
        <EditAllocation
          onSubmit={this.props.onEditProgress}
          error={this.props.error}
          status={this.props.status}
          lecturers={this.props.lecturers}
          errorMessage={this.props.errorMessage}
          message={this.props.message}
        />
      </div>
    );
  }
}
EditAllocations.propTypes = {
  onEditProgress: PropTypes.func,
  SupervisorsFetch: PropTypes.func,
  error: PropTypes.bool,
  status: PropTypes.string,
  lecturers: PropTypes.array,
  errorMessage: PropTypes.string,
  message: PropTypes.string
};
const mapStateToProps = state => {
  return {
    error: state.error.error,
    status: state.edit.status,
    lecturers: state.admin.supervisors,
    errorMessage: state.error.errorMessage,
    message: state.edit.message
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onEditProgress: data => {
      dispatch(actionCreators.editAllocations(data));
    },
    SupervisorsFetch: () => dispatch(actionCreators.allocationRequirements())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditAllocations);
