import React from "react";
import AllocatedStudentsMUItable from "../../components/DataTable/AllocatedStudentsMUItable"
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class StudentTable extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    const {
      isLoading,
      data,
      markAsCompleted,
      status,
      error,
      message,
      errorMessage,
      completed
    } = this.props;
    if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <AllocatedStudentsMUItable
            data={data}
            markAsCompleted={markAsCompleted}
            status={status}
            error={error}
            message={message}
            errorMessage={errorMessage}
            completed={completed}
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
    status: state.supervisor.status,
    message: state.supervisor.message,
    errorMessage: state.error.errorMessage,
    completed: state.supervisor.completed
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
  status: PropTypes.string,
  message: PropTypes.string,
  errorMessage: PropTypes.string,
  completed: PropTypes.bool
};
