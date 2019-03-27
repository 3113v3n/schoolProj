import React from "react";
import AllocationForm from "../../views/Forms/Allocations/AllocationForm.jsx";
import * as actionCreators from "../../Redux/Actions/";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class AddAllocationContainer extends React.Component {
  componentDidMount() {
    this.props.fetchAllocations();
  }

  render() {
    const {
      addAllocation,
      students,
      lecturers,
      error,
      errorMessage,
      message,
      status,
      fetchAllocations
    } = this.props;
    return (
      <div>
        {students.status !== "failed" && lecturers.status !== "failed" ? (
          <AllocationForm
            addAllocation={addAllocation}
            students={students}
            lecturers={lecturers}
            error={error}
            errorMessage={errorMessage}
            message={message}
            status={status}
            fetchAllocations={fetchAllocations}
          />
        ) : (
          <div>
            <p> Add Lecturers and Students To make allocations</p>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.admin.students,
    lecturers: state.admin.supervisors,
    error: state.error.error,
    errorMessage: state.error.errorMessage,
    message: state.admin.message,
    status: state.admin.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchAllocations: () => {
      dispatch(actionCreators.allocationRequirements());
    },
    addAllocation: data => {
      dispatch(actionCreators.addAllocation(data));
    }
  };
};
AddAllocationContainer.propTypes = {
  fetchAllocations: PropTypes.func.isRequired,
  addAllocation: PropTypes.func,
  students: PropTypes.array,
  lecturers: PropTypes.array,
  error: PropTypes.bool,
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  status: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAllocationContainer);
