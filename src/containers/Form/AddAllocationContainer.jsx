import React from "react";
import AllocationForm from "../../views/Forms/Allocations/AllocationForm.jsx";
import * as actionCreators from "../../Redux/Actions/";
import * as actionTypes from "../../Redux/Actions/action-types";
import { connect } from "react-redux";
import PropTypes from "prop-types";
class AddAllocationContainer extends React.Component {
  componentDidMount() {
    this.props.fetchDetails();
  }

  render() {
    const { addAllocation, students, lecturers } = this.props;
    return (
      <div>
        <AllocationForm
          addAllocation={addAllocation}
          students={students}
          lecturers={lecturers}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    students: state.admin.students,
    lecturers: state.admin.supervisors
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchDetails: () => {
      dispatch(actionCreators.fetchDetail());
    },
    addAllocation: data => {
      dispatch(actionCreators.setMyData(actionTypes.NEW_ALLOCATION, data));
    }
  };
};
AddAllocationContainer.propTypes = {
  fetchDetails: PropTypes.func.isRequired,
  addAllocation: PropTypes.func,
  students: PropTypes.array,
  lecturers: PropTypes.array
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddAllocationContainer);
