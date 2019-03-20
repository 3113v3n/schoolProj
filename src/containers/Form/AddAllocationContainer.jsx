import React from "react";
import AllocationForm from "../../views/Forms/Allocations/AllocationForm.jsx";
import * as actionCreators from "../../Redux/Actions/";
//import * as actionTypes from "../../Redux/Actions/action-types";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class AddAllocationContainer extends React.Component {
  componentDidMount() {
    this.props.fetchStudent();
    this.props.fetchSupervisors();
  }

  render() {
    const { addAllocation, students, lecturers, error, status } = this.props;
    return (
      <div>
        <AllocationForm
          addAllocation={addAllocation}
          students={students}
          lecturers={lecturers}
          status={status}
          error={error}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.admin.students,
    lecturers: state.admin.supervisors,
    error: state.error.error,
    status: state.admin.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchStudent: () => {
      dispatch(actionCreators.allocationStudents());
    },
    fetchSupervisors: () => {
      dispatch(actionCreators.allocationSupervisors());
    },
    addAllocation: data => {
      // dispatch(actionCreators.setMyData(actionTypes.NEW_ALLOCATION, data));
      dispatch(actionCreators.addAllocation(data));
    }
  };
};
AddAllocationContainer.propTypes = {
  fetchStudent: PropTypes.func.isRequired,
  fetchSupervisors: PropTypes.func.isRequired,
  addAllocation: PropTypes.func,
  students: PropTypes.array,
  lecturers: PropTypes.array,
  error: PropTypes.bool,
  status: PropTypes.string
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAllocationContainer);
