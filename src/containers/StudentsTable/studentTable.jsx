import React from "react";
import SupervisorComponent from "../../views/Students/Components/SupervisorComponent.jsx";
import { Redirect } from "react-router-dom";
import * as actionCreators from "../../Redux/Actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import * as actionTypes from "../../Redux/Actions/action-types";
class StudentTable extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }
  render() {
    const { isLoading, data, error } = this.props;
    if (error) {
      return (
        <div>
          Error:
          {error.message}
        </div>
      );
    } else if (!isLoading) {
      return <div> Loading...</div>;
    } else {
      return (
        <div>
          <SupervisorComponent
            data={data}
            onEdit={this.props.onEdit}
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
    error: state.supervisor.error
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(actionCreators.supervisorStudents()),
    onEdit: data =>
      dispatch(actionCreators.setMyData(actionTypes.EDIT_STUDENT_TABLE, data))
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
  onEdit: PropTypes.func.isRequired
};
