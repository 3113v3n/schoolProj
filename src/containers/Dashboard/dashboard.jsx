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
       oneTrimestersCount,
       twoTrimestersCount
     } = this.props;

      * studentCount();
      * supervisorsCount();
      * oneTrimestersCount();
      * twoTrimestersCount();
      *
  }
*/
  render() {
    const {
      StudentCount,
      SupervisorCount,
      oneTrimester,
      twoTrimester
    } = this.props;
    return (
      <div>
        <Dashboard
          StudentCount={StudentCount}
          SupervisorCount={SupervisorCount}
          oneTrimester={oneTrimester}
          twoTrimester={twoTrimester}
        />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    StudentCount: state.count.allocatedCount,
    SupervisorCount: state.count.supervisorCount,
    oneTrimester: state.count.oneTrimesterCount,
    twoTrimester: state.count.twoTrimesterCount
  };
};
const mapDispatchToProps = dispatch => {
  return {
    studentCount: () => dispatch(actionCreators.fetchAllocationCount()),
    supervisorsCount: () => dispatch(actionCreators.fetchSupervisorCount()),
    oneTrimestersCount: () => dispatch(actionCreators.fetchOneTrimester()),
    twoTrimestersCount: () => dispatch(actionCreators.fetchTwoTrimester())
  };
};
dashboard.propTypes = {
  StudentCount: PropTypes.number,
  SupervisorCount: PropTypes.number,
  oneTrimester: PropTypes.number,
  twoTrimester: PropTypes.number
};
export default connect(
  mapStateToProps,
  mapDispatchToProps()
)(dashboard);
