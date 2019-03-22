import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "../../views/Dashboard/Dashboard.jsx";
import PropTypes from "prop-types";
import * as actionCreators from "../../Redux/Actions";
class dashboard extends Component {
  /* componentDidMount() {
     const {
       studentCount,
       supervisorsCount,
       degreeStudents,
       diplomaStudents
     } = this.props;

      * studentCount();
      * supervisorsCount();
      * degreeStudents();
      * diplomaStudents();
      *
  }
*/
  render() {
    const { StudentCount, SupervisorCount, degree, diploma } = this.props;
    return (
      <div>
        <Dashboard
          StudentCount={StudentCount}
          SupervisorCount={SupervisorCount}
          degreeStudents={degree}
          diplomaStudents={diploma}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    StudentCount: state.count.allocatedCount,
    SupervisorCount: state.count.supervisorCount,
    degree: state.count.degreeCount,
    diploma: state.count.diplomaCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    studentCount: () => dispatch(actionCreators.fetchAllocationCount()),
    supervisorsCount: () => dispatch(actionCreators.fetchSupervisorCount()),
    degreeStudents: () => dispatch(actionCreators.fetchDegreeStudents()),
    diplomaStudents: () => dispatch(actionCreators.fetchDiplomaStudents())
  };
};
dashboard.propTypes = {
  StudentCount: PropTypes.number,
  SupervisorCount: PropTypes.number,
  degree: PropTypes.number,
  diploma: PropTypes.number
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(dashboard);
