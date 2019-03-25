import React, { Component } from "react";
import { connect } from "react-redux";
import Dashboard from "../../views/Dashboard/Dashboard.jsx";
import PropTypes from "prop-types";
import { fetchDashboardCount } from "../../Redux/Actions/index";
class dashboard extends Component {
  componentDidMount() {
    this.props.fetchDashboardCount();
  }

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
    fetchDashboardCount: () => {
      dispatch(fetchDashboardCount());
    }
  };
};

dashboard.propTypes = {
  StudentCount: PropTypes.number,
  SupervisorCount: PropTypes.number,
  degree: PropTypes.number,
  diploma: PropTypes.number,
  fetchDashboardCount: PropTypes.func
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dashboard);
