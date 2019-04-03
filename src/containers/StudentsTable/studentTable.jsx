import React from "react";
import SupervisorComponent from "../../views/Students/Components/SupervisorComponent.jsx";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StudentTable extends React.Component {
  UNSAFE_componentWillMount() {
    this.props.fetchData();
  }
  render() {
    const { isLoading, data, markAsCompleted, status } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <SupervisorComponent
            data={data}
            markAsCompleted={markAsCompleted}
            status={status}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    data: state.supervisor.myData,
    isLoading: state.supervisor.isLoading,
    error: state.error.error,
    status: state.supervisor.status
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(actionCreators.supervisorStudents()),
    markAsCompleted: data => dispatch(actionCreators.markComplete(data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentTable);

StudentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  data: PropTypes.array,
  fetchData: PropTypes.func.isRequired,
  markAsCompleted: PropTypes.func.isRequired,
  status: PropTypes.string
};
